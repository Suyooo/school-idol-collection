import DB, {patternRow} from "../../utils/db";
import {getPattern, Pattern} from "./pattern";
import Log from "../../utils/logger";
import Trigger from "../../consts/triggers";
import ErrorWithCause from "../../errors/errorWithCause";
import ParseError from "../../errors/parse";
import {loadCardFromCardNo} from "../../cards/loader";

const getAllPatternsStmt = DB.prepare("SELECT * FROM patterns");
const getAllCardsStmt = DB.prepare("SELECT cardno, skill FROM cards");
const getCardStmt = DB.prepare("SELECT skill FROM cards WHERE cardno = ?");
const insertCardsTranslationStmt = DB.prepare("INSERT OR REPLACE INTO cards_translation_skill VALUES(?,?,?,?)");
const getAllGroupsStmt = DB.prepare("SELECT id, skill FROM cards_members_groups");
const insertGroupsTranslationStmt = DB.prepare("INSERT OR REPLACE INTO cards_translation_group_skill VALUES(?,?,?,?)");
const getUntranslatedStmt = DB.prepare("SELECT cardno, skill, (LENGTH(skill)-LENGTH(REPLACE(skill,X'0A',''))+1) as skill_count, (SELECT COUNT(*) FROM cards_translation_skill WHERE cards_m_cardno = cardno) as translation_count FROM cards WHERE translation_count != skill_count");

const skillPattern = /^(【[^【】]*?】(?:\/【[^【】]*?】)*)(.*?)$/;

export function listUntranslatedSkills() {
    return getUntranslatedStmt.all();
}

export function loadSkillDetails(cardno: string, line: number): { triggers: [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean], skill: string } | undefined {
    const card = loadCardFromCardNo(cardno);
    if (card == undefined || card.skill == undefined) return undefined;
    const skill = card.skill.split("\n")[line];
    if (skill == undefined) return undefined;

    const trigArr: [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean] = [false, false, false, false, false, false, false, false];
    const isSkill = skillPattern.exec(skill);
    if (isSkill === null) {
        return {triggers: trigArr, skill: skill};
    } else {
        const triggers = isSkill[1].split("/").map(t => Trigger.fromJpn(t.substring(1, t.length - 1)));
        triggers.forEach(t => trigArr[t.id] = true);
        return {triggers: trigArr, skill: isSkill[2]};
    }
}

export function getAssignableSkills(patternId: number): { id: string, line: number, skillJpn: string, skillEng: string }[] {
    const res = [];
    const pattern = getPattern(patternId);
    if (pattern === undefined) {
        throw new Error("Pattern " + patternId + " does not exist");
    }
    for (const cardRow of getAllCardsStmt.all()) {
        if (cardRow.skill == undefined) continue;
        let i = -1;
        for (const skill of cardRow.skill.split("\n")) {
            i++;
            const isSkill = skillPattern.exec(skill);
            if (isSkill === null) {
                if (!pattern.testSkill(skill)) continue;
                let skillRes;
                try {
                    skillRes = pattern.translateSkill(skill);
                } catch (e) {
                    skillRes = "Error: " + e.message;
                }
                res.push({
                    id: cardRow.cardno,
                    line: i,
                    skillJpn: skill,
                    skillEng: skillRes
                });
            } else {
                if (!pattern.testSkill(isSkill[2])) continue;
                let skillRes;
                try {
                    skillRes = pattern.translateSkill(isSkill[2]);
                } catch (e) {
                    skillRes = "Error: " + e.message;
                }
                res.push({
                    id: cardRow.cardno,
                    line: i,
                    skillJpn: isSkill[2],
                    skillEng: skillRes
                });
            }
        }
    }
    return res;
}

export function assignSkills(patternId: number, cards: { id: string, line: number }[]) {
    const pattern = getPattern(patternId);
    if (pattern === undefined) {
        throw new Error("Pattern " + patternId + " does not exist");
    }
    for (const card of cards) {
        const row = getCardStmt.get(card.id);
        if (row === undefined) {
            throw new Error("Card " + card.id + " does not exist");
        }
        const skill = row.skill.split("\n")[card.line];
        const isSkill = skillPattern.exec(skill);
        if (isSkill === null) {
            insertCardsTranslationStmt.run(card.id, card.line, pattern.translateSkill(skill), patternId);
        } else {
            insertCardsTranslationStmt.run(card.id, card.line, isSkill[1].split("/").map(t => "[" + Trigger.fromJpn(t.substring(1, t.length - 1)).eng + "]").join("/") +
                " " + pattern.translateSkill(isSkill[2]), patternId);
        }
    }
}

function translateLine(skill: string): { usedPattern: number | undefined, skill: string } {
    const isSkill = skillPattern.exec(skill);
    if (isSkill === null) {
        // not a skill
        for (const pr of getAllPatternsStmt.all()) {
            if (pr.triggers != 0) continue;
            const pattern = Pattern.loadFromRow(pr);
            if (!pattern.testSkill(skill)) continue;
            let res;
            try {
                res = pattern.translateSkill(skill);
            } catch (err) {
                throw new ErrorWithCause("Error while translating with pattern " + pattern.id, err);
            }
            if (res != undefined) {
                return {
                    usedPattern: pattern.id,
                    skill: res
                };
            } else {
                throw new ParseError("Pattern #" + pattern.id + " applies but can't translate the skill");
            }
        }
    } else {
        const triggers = isSkill[1].split("/").map(t => Trigger.fromJpn(t.substring(1, t.length - 1)));
        const triggerBitmask = triggers.map(t => 1 << t.id).reduce((acc, i) => acc + i, 0);
        for (const pr of getAllPatternsStmt.all()) {
            if ((triggerBitmask & pr.triggers) != triggerBitmask) continue;
            const pattern = Pattern.loadFromRow(pr);
            if (!pattern.testSkill(isSkill[2])) continue;
            let res;
            try {
                res = pattern.translateSkill(isSkill[2]);
            } catch (err) {
                throw new ErrorWithCause("Error while translating with pattern " + pattern.id, err);
            }
            if (res != undefined) {
                return {
                    usedPattern: pattern.id,
                    skill: triggers.map(t => "[" + t.eng + "]").join("/") + " " + res
                };
            } else {
                throw new ParseError("Pattern #" + pattern.id + " applies but a group replacement failed");
            }
        }
    }
    return {
        usedPattern: undefined,
        skill: skill
    };
}

export default function translateSkill(skill: string): { usedPattern: number | undefined, skill: string }[] {
    return skill.split("\n").map(line => translateLine(line));
}