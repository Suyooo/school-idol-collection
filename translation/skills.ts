import DB from "../models/db";
import TranslationPattern from "../models/translation/pattern";
import PatternApplyError from "../errors/patternApplyError";
import Trigger, {TriggerNameJpn} from "../types/trigger";
import CardMemberGroup from "../models/card/memberGroup";
import Card from "../models/card/card";

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
    : Promise<({ cardNo: string, skill: string, line: number } | { groupId: number, firstCardNo: string, skill: string, line: number })[]> {
    const allSkills: (Card | CardMemberGroup)[] = (await DB.Card.scope(["hasSkill"]).findAll({
        attributes: ["cardNo"], include: [DB.Skill]
    }) as (Card | CardMemberGroup)[]).concat(await DB.CardMemberGroup.scope(["hasSkill"]).findAll({
        attributes: ["id"], include: [DB.Skill, DB.CardMemberExtraInfo]
    }));
    return allSkills.flatMap(skillObj => {
        const skillLineCount = skillObj.skills.length;
        const translatedLineIds = skillObj.skills.filter(s => s.eng !== null).map(s => s.line);
        if (skillLineCount === translatedLineIds.length) return [];

        return skillObj.skills
            .filter((s, i) => translatedLineIds.indexOf(i) === -1)
            .map((s, i) => <{ cardNo: string, skill: string, line: number } | { groupId: number, firstCardNo: string, skill: string, line: number }>
                (skillObj instanceof Card
                    ? {cardNo: skillObj.cardNo, skill: s.jpn, line: i}
                    : {groupId: skillObj.id, firstCardNo: skillObj.memberExtraInfos[0].cardNo, skill: s.jpn, line: i}));
    });
}

export async function getApplicableSkills(pattern: TranslationPattern)
    : Promise<({ cardNo: string, line: number, skillId: number, skillJpn: string, skillEng: string } |
    { groupId: number, firstCardNo: string, line: number, skillId: number, skillJpn: string, skillEng: string })[]> {
    const res = [];
    const allSkills: (Card | CardMemberGroup)[] = (await DB.Card.scope(["hasSkill"]).findAll({
        attributes: ["cardNo"], include: [DB.Skill]
    }) as (Card | CardMemberGroup)[]).concat(await DB.CardMemberGroup.scope(["hasSkill"]).findAll({
        attributes: ["id"], include: [DB.Skill, DB.CardMemberExtraInfo]
    }));
    for (const skillObj of allSkills) {
        let i = 0;
        for (const skillLine of skillObj.skills) {
            const {skill, triggers} = splitTriggersFromSkill(skillLine.jpn);
            const appliedPattern = await applyPatternOrNull(skill, triggers, pattern);
            if (appliedPattern !== null) {
                res.push(skillObj instanceof Card
                    ? {
                        cardNo: skillObj.cardNo,
                        line: i,
                        skillId: skillLine.id,
                        skillJpn: skill,
                        skillEng: appliedPattern
                    }
                    : {
                        groupId: skillObj.id,
                        firstCardNo: skillObj.memberExtraInfos[0].cardNo,
                        line: i,
                        skillId: skillLine.id,
                        skillJpn: skill,
                        skillEng: appliedPattern
                    });
            }
            i++;
        }
    }
    return res;
}

export async function applyPatternToSkills(pattern: TranslationPattern, applyTo: [number, number][]) {
    for (const application of applyTo) {
        const skillLine = await DB.Skill.findOne({where: {id: application[0], line: application[1]}});
        if (skillLine === null) {
            throw new PatternApplyError(Error("Pattern should be applied to Skill #" + application.join(", line") + ", but it does not exist"), pattern, "---");
        }

        const {skill, triggers} = splitTriggersFromSkill(skillLine.jpn);
        const translatedSkill = await applyPatternOrNull(skill, triggers, pattern);
        if (translatedSkill === null) {
            throw new PatternApplyError(Error("Pattern should be applied to Skill #" + application.join(", line ") + ", but its regex does not match the Skill"), pattern, skillLine.jpn);
        }

        skillLine.eng = triggers.map(t => "[" + t.nameEng + "]").join("/") + " " + translatedSkill;
        skillLine.patternId = pattern.id;
        await skillLine.save();
    }
}

export async function tryAllPatterns(skillLine: string): Promise<{ skill: string, pattern: TranslationPattern } | null> {
    const {skill, triggers} = splitTriggersFromSkill(skillLine);
    for (const pattern of (await DB.TranslationPattern.findAll())) {
        const res = applyPatternOrNull(skill, triggers, pattern);
        if (res !== null) {
            return {skill, pattern};
        }
    }
    return null;
}

async function applyPatternOrNull(skill: string, triggers: Trigger[], pattern: TranslationPattern): Promise<string | null> {
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
            allRepls[gi] = await groupTypeArray[gi].getReplacement(match[gi + 1]);
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