import { Op } from "@sequelize/core";
import type Card from "$models/card/card.js";
import type { Sequelize } from "$models/db.js";
import Language from "$lib/enums/language.js";
import { parseSkillToNodes } from "$lib/format/format.js";

export default interface CardPageExtraInfo<IncludeSameId extends boolean, IncludeNeighbors extends boolean> {
    cardSet: string;
    sameId: IncludeSameId extends true ? Card[] : never;
    neighbors: IncludeNeighbors extends true ? { [k in "prev" | "next"]: string | null } : never;
}

export async function addExtraInfo<IncludeSameId extends boolean, IncludeNeighbors extends boolean>(
    DB: Sequelize,
    card: Card,
    sameId: IncludeSameId,
    neighbors: IncludeNeighbors,
    preparse: boolean
) {
    const cardWithExtraInfo = card as Card & CardPageExtraInfo<IncludeSameId, IncludeNeighbors>;
    addCardSet(cardWithExtraInfo);
    if (sameId) await addSameIdCards(DB, cardWithExtraInfo);
    if (neighbors) await addNeighborCards(DB, cardWithExtraInfo);
    if (preparse) addPreparse(cardWithExtraInfo);
    return cardWithExtraInfo;
}

function addCardSet(card: Card & CardPageExtraInfo<boolean, boolean>) {
    card.cardSet = card.cardNo.split("-")[0];
}

async function addSameIdCards(DB: Sequelize, card: Card & CardPageExtraInfo<true, boolean>) {
    card.sameId = (
        await DB.m.Card.withScope(["viewForLink", "viewRarity", "orderCardNo"]).findAll({
            where: {
                id: card.id,
                cardNo: { [Op.not]: card.cardNo },
            },
        })
    ).map((card) => card.get({ plain: true }));
}

async function addNeighborCards(DB: Sequelize, card: Card & CardPageExtraInfo<boolean, true>) {
    card.neighbors = {
        prev:
            (await DB.m.Card.withScope(["viewCardNoOnly", { method: ["filterBefore", card.cardNo] }]).findOne())
                ?.cardNo ?? null,
        next:
            (await DB.m.Card.withScope(["viewCardNoOnly", { method: ["filterAfter", card.cardNo] }]).findOne())
                ?.cardNo ?? null,
    };
    // Remove neighbors if they do not share the same card set
    if (card.neighbors.prev && card.neighbors.prev.split("-")[0] !== card.cardSet) card.neighbors.prev = null;
    if (card.neighbors.next && card.neighbors.next.split("-")[0] !== card.cardSet) card.neighbors.next = null;
}

function addPreparse(card: Card & CardPageExtraInfo<boolean, boolean>) {
    card.skills.forEach((skill) => {
        skill.jpnPreparsed = parseSkillToNodes(skill, Language.JPN, false, card.type);
        skill.engPreparsed = skill.eng ? parseSkillToNodes(skill, Language.ENG, false, card.type) : null;
    });
    if (card.member?.group) {
        card.member.group.skills.forEach((skill) => {
            skill.jpnPreparsed = parseSkillToNodes(skill, Language.JPN);
            skill.engPreparsed = skill.eng ? parseSkillToNodes(skill, Language.ENG) : null;
        });
    }
    for (const faq of card.faqs) {
        faq.labelPreparsed = parseSkillToNodes(faq.label, Language.ENG, true);
    }
}
