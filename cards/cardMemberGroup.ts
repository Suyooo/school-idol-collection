import DB from "../utils/db";

const testSoloStmt = DB.prepare("SELECT groups_m_id FROM cards_members_groups_map WHERE member_id = ?");
const testPairStmt = DB.prepare("SELECT groups_m_id FROM cards_members_groups_map WHERE member_id IN (?, ?)");
const testTrioStmt = DB.prepare("SELECT groups_m_id FROM cards_members_groups_map WHERE member_id IN (?, ?, ?)");
const getGroupStmt = DB.prepare("SELECT * FROM cards_members_groups WHERE id = ?");
const getGroupMapStmt = DB.prepare("SELECT member_id FROM cards_members_groups_map WHERE groups_m_id = ?");
const insertGroupStmt = DB.prepare("INSERT INTO cards_members_groups(skill) VALUES(?)");
const insertGroupMapStmt = DB.prepare("INSERT INTO cards_members_groups_map(member_id, groups_m_id) VALUES(?, ?)");
const updatePairStmt = DB.prepare("UPDATE cards_members SET groups_m_id = ? WHERE cards_m_cardno IN (SELECT cardno FROM cards WHERE id IN (?, ?))");
const updateTrioStmt = DB.prepare("UPDATE cards_members SET groups_m_id = ? WHERE cards_m_cardno IN (SELECT cardno FROM cards WHERE id IN (?, ?, ?))");

const getSkillTranslation = DB.prepare("SELECT skill FROM cards_translation_group_skill WHERE groups_m_id = ? ORDER BY line");

export default class CardMemberGroup {
    readonly id: number;
    readonly type: CardMemberGroupType;
    readonly memberIds: number[];
    readonly skill: string | undefined;

    private _skillEn: string | undefined | null = null;

    constructor(id: number | undefined, memberIds: number[], skill: string | undefined) {
        this.memberIds = memberIds;
        this.skill = skill;
        this.type = this.memberIds.length == 2 ? CardMemberGroupType.PAIR : CardMemberGroupType.TRIO;

        if (id === undefined) {
            const testRow: {groups_m_id: number} | undefined = this.type == CardMemberGroupType.PAIR
                ? testPairStmt.get(this.memberIds[0], this.memberIds[1])
                : testTrioStmt.get(this.memberIds[0], this.memberIds[1], this.memberIds[2]);
            if (testRow) {
                id = testRow.groups_m_id;
            } else {
                id = insertGroupStmt.run(skill).lastInsertRowid as number;
                for (const memberId of this.memberIds) {
                    insertGroupMapStmt.run(memberId, id);
                }
            }
        }
        this.id = id;

        if (this.type == CardMemberGroupType.PAIR) {
            updatePairStmt.run(this.id, this.memberIds[0], this.memberIds[1]);
        } else if (this.type == CardMemberGroupType.TRIO) {
            updateTrioStmt.run(this.id, this.memberIds[0], this.memberIds[1], this.memberIds[2]);
        }
    }

    get skillEn(): string | undefined {
        if (this._skillEn === null) {
            this._skillEn = getSkillTranslation.all(this.id).map(r => r.skill).join("\n");
            if (this._skillEn == "") this._skillEn = undefined;
        }
        return this._skillEn;
    }
}

function loadGroup(id: number): CardMemberGroup {
    return new CardMemberGroup(id, getGroupMapStmt.all(id).map(r => r.member_id), getGroupStmt.get(id).skill);
}

export function getGroupFor(member_id: number): CardMemberGroup | undefined {
    const row = testSoloStmt.get(member_id);
    return row ? loadGroup(row.groups_m_id) : undefined;
}

enum CardMemberGroupType {
    PAIR,
    TRIO
}

export {CardMemberGroupType};