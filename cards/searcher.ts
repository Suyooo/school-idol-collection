import {Card} from "./card";
import {loadCardFromRow} from "./loader";
import DB from "../utils/db";

const searchSkillStmt = DB.prepare("SELECT * FROM cards JOIN cards_translation_skill ON cardno = cards_m_cardno WHERE cards.skill LIKE ? OR cards_translation_skill.skill LIKE ? ORDER BY id");

export function searchSkill(skill: string): Card[] {
    const arr: Card[] = [];
    const rows: Card[] = searchSkillStmt.all("%" + skill + "%", "%" + skill + "%");
    for (const row of rows) {
        const card = loadCardFromRow(row);
        if (card != undefined) arr.push(card);
    }
    return arr;
}

const searchCostumeStmt = DB.prepare("SELECT * FROM cards JOIN cards_members ON cardno = cards_m_cardno JOIN table_songs ON costume = jpn WHERE costume LIKE ? OR eng LIKE ? ORDER BY id");

export function searchCostume(costume: string): Card[] {
    const arr: Card[] = [];
    const rows: Card[] = searchCostumeStmt.all("%" + costume + "%", "%" + costume + "%");
    for (const row of rows) {
        const card = loadCardFromRow(row);
        if (card != undefined) arr.push(card);
    }
    return arr;
}

const searchTypeNameStmt = DB.prepare("SELECT * FROM cards JOIN cards_translation_name ON cardno = cards_m_cardno WHERE type = ? AND (cards.name LIKE ? OR cards_translation_name.name LIKE ?) ORDER BY id");

export function searchTypeName(cardType: number, name: string): Card[] {
    const arr: Card[] = [];
    const rows: Card[] = searchTypeNameStmt.all(cardType, "%" + name + "%", "%" + name + "%");
    for (const row of rows) {
        const card = loadCardFromRow(row);
        if (card != undefined) arr.push(card);
    }
    return arr;
}