import DB from "$models/db";
import type TranslationPattern from "$models/translation/pattern";
import PatternApplyError from "$errors/patternApplyError";
import Trigger from "$translation/trigger";
import type {TriggerNameJpn} from "$translation/trigger";
import type {QueryOptions} from "sequelize";

export const checkTriggersPattern = /^(【[^【】]*?】(?:\/【[^【】]*?】)*)(.*?)$/;

export function splitTriggersFromSkill(skillLine: string): { skill: string, triggers: Trigger[] } {
    const hasTriggersMatch = checkTriggersPattern.exec(skillLine);
    if (hasTriggersMatch) {
        return {
            skill: hasTriggersMatch[2],
            triggers: hasTriggersMatch[1].split("/")
                .map(t => Trigger.get(t.substring(1, t.length - 1) as TriggerNameJpn))
        };
    } else {
        return {skill: skillLine, triggers: []};
    }
}

export async function listUntranslatedSkills()
    : Promise<({skill: string, skillId: number } & ({ cardNo: string } | { groupId: number, firstCardNo: string }))[]> {
    const allSkills = await DB.Skill.findAll({
        where: {eng: null},
        include: [{model: DB.CardMemberGroup, include: [{model: DB.CardMemberExtraInfo, attributes: ["cardNo"]}]}]
    });

    return allSkills.map(skillObj => ((skillObj.isCardSkill()
            ? {cardNo: skillObj.cardNo, skill: skillObj.jpn, skillId: skillObj.id}
            : {
                groupId: skillObj.groupId,
                firstCardNo: skillObj.group.memberExtraInfos[0].cardNo,
                skill: skillObj.jpn,
                skillId: skillObj.id
            }))
    );
}

export async function getApplicableSkills(pattern: TranslationPattern, options?: QueryOptions)
    : Promise<({ cardNo: string, skillId: number, skillJpn: string, skillEng: string } |
    { groupId: number, firstCardNo: string, skillId: number, skillJpn: string, skillEng: string })[]> {
    const res = [];
    const allSkills = await DB.Skill.findAll({
        ...options,
        include: [{model: DB.CardMemberGroup, include: [{model: DB.CardMemberExtraInfo, attributes: ["cardNo"]}]}]
    });

    for (const skillObj of allSkills) {
        const {skill, triggers} = splitTriggersFromSkill(skillObj.jpn);
        const appliedPattern = await applyPatternOrNull(skill, triggers, pattern, options);
        if (appliedPattern !== null) {
            res.push(skillObj.isCardSkill()
                ? {
                    cardNo: skillObj.cardNo,
                    skillId: skillObj.id,
                    skillJpn: skill,
                    skillEng: appliedPattern
                }
                : {
                    groupId: skillObj.id,
                    firstCardNo: skillObj.group.memberExtraInfos[0].cardNo,
                    skillId: skillObj.id,
                    skillJpn: skill,
                    skillEng: appliedPattern
                });
        }
    }
    return res;
}

export async function applyPatternToSkills(pattern: TranslationPattern, applyTo: number[]) {
    await DB.sequelize.transaction(async (transaction) => {
        for (const application of applyTo) {
            const skillObj = await DB.Skill.findByPk(application, {transaction});
            if (skillObj === null) {
                throw new PatternApplyError(Error("Pattern should be applied to Skill #" + application + ", but it does not exist"), pattern, "---");
            }

            const {skill, triggers} = splitTriggersFromSkill(skillObj.jpn);
            const translatedSkill = await applyPatternOrNull(skill, triggers, pattern, {transaction});
            if (translatedSkill === null) {
                throw new PatternApplyError(Error("Pattern should be applied to Skill #" + application + ", but its regex does not match the Skill"), pattern, skillObj.jpn);
            }

            skillObj.eng = triggers.map(t => "[" + t.nameEng + "]").join("/") + " " + translatedSkill;
            skillObj.patternId = pattern.id;
            await skillObj.save({transaction});
        }
    });
}

export async function tryAllPatterns(skillLine: string, options?: QueryOptions): Promise<{ skill: string, pattern: TranslationPattern } | null> {
    const {skill, triggers} = splitTriggersFromSkill(skillLine);
    for (const pattern of (await DB.TranslationPattern.findAll(options))) {
        const res = await applyPatternOrNull(skill, triggers, pattern, options);
        if (res !== null) {
            return {skill, pattern};
        }
    }
    return null;
}

async function applyPatternOrNull(skill: string, triggers: Trigger[], pattern: TranslationPattern, options?: QueryOptions): Promise<string | null> {
    // If this is a skill without triggers (tutorial text or lyrics), only patterns without triggers can be applied
    // Otherwise, check for at least one overlapping trigger
    if (pattern.triggers > 0 && (triggers.length === 0 || pattern.triggerArray.every(t => triggers.indexOf(t) === -1))) {
        return null;
    }

    const match = new RegExp(pattern.regex).exec(skill);
    if (match === null) {
        return null;
    }

    const groupTypeArray = pattern.groupTypeArray;
    const allRepls: string[] = new Array(groupTypeArray.length);
    try {
        for (let gi = 0; gi < groupTypeArray.length; gi++) {
            allRepls[gi] = await groupTypeArray[gi].getReplacement(match[gi + 1], options);
        }
    } catch (e) {
        throw new PatternApplyError(e, pattern, skill);
    }

    let res = pattern.template;
    for (let gi = 0; gi < groupTypeArray.length; gi++) {
        res = res.replace(new RegExp("<" + (gi + 1) + ">", "g"), allRepls[gi]);
        for (const [from, to] of groupTypeArray[gi].getExtraReplacements(match[gi + 1], gi + 1, allRepls)) {
            res = res.replace(new RegExp(from, "g"), to);
        }
    }

    return res;
}