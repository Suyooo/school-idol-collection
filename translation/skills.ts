import Log from "../utils/logger";
import DB from "../models/db";
import {Op} from "sequelize";
import TranslateTablePattern from "../models/translatetables/pattern";
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
    const allSkills: (Card | CardMemberGroup)[] = await DB.Card.scope(["hasSkill"]).findAll({
        attributes: ["cardNo", "skill"], include: [DB.TranslationSkill]
    });
    allSkills.concat(await DB.CardMemberGroup.scope(["hasSkill"]).findAll({
        attributes: ["id", "skill"], include: [DB.TranslationGroupSkill, DB.CardMemberExtraInfo]
    }));
    return allSkills.flatMap(skillObj => {
        const skillLineCount = skillObj.skillLines.length;
        const translatedLineCount = skillObj._skillLinesEng.length;
        if (skillLineCount === translatedLineCount) return [];
        const translatedLineIds = skillObj._skillLinesEng.map(s => s.line);
        return skillObj.skillLines
            .filter((s, i) => translatedLineIds.indexOf(i) === -1)
            .map((s, i) => (skillObj instanceof Card
                ? {cardNo: skillObj.cardNo, skill: s, line: i}
                : {groupId: skillObj.id, firstCardNo: skillObj.memberExtraInfos[0].cardNo, skill: s, line: i}));
    });
}

export async function getApplicableSkills(pattern: TranslateTablePattern)
    : Promise<({ cardNo: string, line: number, skillJpn: string, skillEng: string } | { groupId: number, firstCardNo: string, line: number, skillJpn: string, skillEng: string })[]> {
    const res = [];
    const allSkills: (Card | CardMemberGroup)[] = await DB.Card.scope(["hasSkill"]).findAll({
        attributes: ["cardNo", "skill"], include: [DB.TranslationSkill]
    });
    allSkills.concat(await DB.CardMemberGroup.scope(["hasSkill"]).findAll({
        attributes: ["cardNo", "skill"], include: [DB.TranslationGroupSkill, DB.CardMemberExtraInfo]
    }));
    for (const skillObj of allSkills) {
        let i = 0;
        for (const skillLine of skillObj.skillLines) {
            const {skill, triggers} = splitTriggersFromSkill(skillLine);
            const appliedPattern = await applyPatternOrNull(skill, triggers, pattern);
            if (appliedPattern !== null) {
                res.push(skillObj instanceof Card
                    ? {cardNo: skillObj.cardNo, line: i, skillJpn: skill, skillEng: appliedPattern}
                    : {
                        groupId: skillObj.id,
                        firstCardNo: skillObj.memberExtraInfos[0].cardNo,
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

export async function applyPatternToSkills(pattern: TranslateTablePattern, applyTo: ({ cardNo: string, line: number } | { groupId: number, line: number })[]) {
    for (const application of applyTo) {
        const isCardApplication = "cardNo" in application;
        let skillObj: Card | CardMemberGroup | null;
        if (isCardApplication) {
            skillObj = await DB.Card.findByPk(application.cardNo, {attributes: ["skill"]});
        } else {
            skillObj = await DB.CardMemberGroup.findByPk(application.groupId, {attributes: ["skill"]});
        }
        if (skillObj === null) {
            throw new PatternApplyError(Error("Pattern should be applied to "
                + (isCardApplication ? "Card " + application.cardNo : "Group #" + application.groupId)
                + ", but it does not exist"), pattern, "---");
        }
        if (skillObj.skill === null) {
            throw new PatternApplyError(Error("Pattern should be applied to "
                + (isCardApplication ? "Card " + application.cardNo : "Group #" + application.groupId)
                + ", but it has no Skill"), pattern, "---");
        }

        const skillLine = skillObj.skill.split("\n")[application.line];
        const {skill, triggers} = splitTriggersFromSkill(skillLine);
        const translatedSkill = await applyPatternOrNull(skill, triggers, pattern);
        if (translatedSkill === null) {
            throw new PatternApplyError(Error("Pattern should be applied to "
                + (isCardApplication ? "Card " + application.cardNo : "Group #" + application.groupId)
                + " line " + application.line + ", but its regex does not match the Skill"), pattern, skillLine);
        }

        if (isCardApplication) {
            await DB.TranslationSkill.upsert({
                cardId: application.cardNo,
                line: application.line,
                skill: triggers.map(t => "[" + t.nameEng + "]").join("/") + " " + translatedSkill,
                patternId: pattern.id
            });
        } else {
            await DB.TranslationGroupSkill.upsert({
                groupId: application.groupId,
                line: application.line,
                skill: triggers.map(t => "[" + t.nameEng + "]").join("/") + " " + translatedSkill,
                patternId: pattern.id
            });
        }
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