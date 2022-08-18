import Log from "../utils/logger";
import DB from "../models/db";
import {Op} from "sequelize";
import TranslateTablePattern from "../models/translatetables/pattern";
import PatternApplyError from "../errors/patternApplyError";
import Trigger, {TriggerNameJpn} from "../types/trigger";

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

export async function listUntranslatedSkills() {
    const allSkillCards = await DB.Card.findAll({
        attributes: ["cardNo", "skill"],
        where: {
            skill: {
                [Op.not]: null
            }
        },
        include: [DB.TranslationSkill]
    });
    return allSkillCards.flatMap(card => {
        const skillLineCount = card.skillLines.length;
        const translatedLineCount = card._skillLinesEng.length;
        if (skillLineCount === translatedLineCount) return [];
        const translatedLineIds = card._skillLinesEng.map(s => s.line);
        return card.skillLines.map((s, i) => ({
            cardNo: card.cardNo,
            skill: s,
            line: i
        })).filter(s => translatedLineIds.indexOf(s.line) === -1);
    });
}

export async function getApplicableCardSkills(pattern: TranslateTablePattern): Promise<{ cardNo: string, line: number, skillJpn: string, skillEng: string }[]> {
    const res = [];
    for (const card of await DB.Card.findAll({
        attributes: ["cardNo", "skill"],
        where: {
            skill: {
                [Op.not]: null
            }
        }
    })) {
        let i = 0;
        for (const skillLine of card.skillLines) {
            const {skill, triggers} = splitTriggersFromSkill(skillLine);
            const appliedPattern = await applyPatternOrNull(skill, triggers, pattern);
            if (appliedPattern !== null) {
                res.push({
                    cardNo: card.cardNo,
                    line: i,
                    skillJpn: skill,
                    skillEng: appliedPattern
                });
            }
            i++;
        }
    }
    return res;
}

export async function getApplicableGroupSkills(pattern: TranslateTablePattern): Promise<{ groupId: number, line: number, skillJpn: string, skillEng: string }[]> {
    const res = [];
    for (const group of await DB.CardMemberGroup.findAll({
        attributes: ["id", "skill"],
        where: {
            skill: {
                [Op.not]: null
            }
        }
    })) {
        let i = 0;
        for (const skillLine of group.skillLines) {
            const {skill, triggers} = splitTriggersFromSkill(skillLine);
            const appliedPattern = await applyPatternOrNull(skill, triggers, pattern);
            if (appliedPattern !== null) {
                res.push({
                    groupId: group.id,
                    line: i,
                    skillJpn: skill,
                    skillEng: appliedPattern
                });
            }
            i++;
        }
    }
    return res;
}

export async function applyPatternToCardSkills(pattern: TranslateTablePattern, applyTo: { cardNo: string, line: number }[]) {
    for (const application of applyTo) {
        const card = await DB.Card.findByPk(application.cardNo, {attributes: ["cardNo", "skill"]});
        if (card === null) {
            throw new PatternApplyError(Error("Pattern should be applied to card " + application.cardNo + ", but it does not exist"), pattern, "---");
        }
        if (card.skill === null) {
            throw new PatternApplyError(Error("Pattern should be applied to card " + application.cardNo + ", but it has no Skill"), pattern, "---");
        }

        const skillLine = card.skill.split("\n")[application.line];
        const {skill, triggers} = splitTriggersFromSkill(skillLine);
        const translatedSkill = await applyPatternOrNull(skill, triggers, pattern);
        if (translatedSkill === null) {
            throw new PatternApplyError(Error("Pattern should be applied to card " + application.cardNo + " line " + application.line + ", but it does not match"), pattern, skillLine);
        }

        await DB.TranslationSkill.upsert({
            cardId: card.cardNo,
            line: application.line,
            skill: triggers.map(t => "[" + t.nameEng + "]").join("/") + " " + translatedSkill,
            patternId: pattern.id
        });
    }
}

export async function applyPatternToGroupSkills(pattern: TranslateTablePattern, applyTo: { groupId: number, line: number }[]) {
    for (const application of applyTo) {
        const group = await DB.CardMemberGroup.findByPk(application.groupId, {attributes: ["cardNo", "skill"]});
        if (group === null) {
            throw new PatternApplyError(Error("Pattern should be applied to group " + application.groupId + ", but it does not exist"), pattern, "---");
        }
        if (group.skill === null) {
            throw new PatternApplyError(Error("Pattern should be applied to group " + application.groupId + ", but it has no Skill"), pattern, "---");
        }

        const skillLine = group.skill.split("\n")[application.line];
        const {skill, triggers} = splitTriggersFromSkill(skillLine);
        const translatedSkill = await applyPatternOrNull(skill, triggers, pattern);
        if (translatedSkill === null) {
            throw new PatternApplyError(Error("Pattern should be applied to group " + application.groupId + " line " + application.line + ", but it does not match"), pattern, skillLine);
        }

        await DB.TranslationGroupSkill.upsert({
            groupId: group.id,
            line: application.line,
            skill: triggers.map(t => "[" + t.nameEng + "]").join("/") + " " + translatedSkill,
            patternId: pattern.id
        });
    }
}

async function applyPatternOrNull(skill: string, triggers: Trigger[], pattern: TranslateTablePattern): Promise<string | null> {
    // If this is a skill without triggers (tutorial text or lyrics), only patterns without triggers can be applied
    // Otherwise, check for at least one overlapping trigger
    if (pattern.triggers > 0 && (triggers.length === 0 || pattern.triggerArray.every(t => triggers.indexOf(t) === -1))) {
        return null;
    }

    const match = new RegExp(pattern.regex, "g").exec(skill);
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