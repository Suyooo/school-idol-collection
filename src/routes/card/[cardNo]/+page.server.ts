import type {PageServerLoad} from './$types';
import {error} from "@sveltejs/kit";
import type Card from "$models/card/card";
import {Op} from "sequelize";
import {cardOrder} from "$models/card/card";
import type Annotation from "$models/skill/annotation";
import type Link from "$models/skill/link";

export const load: PageServerLoad = (async ({params, locals}) => {
    const card = await locals.db.Card.scope(["full"]).findByPk(params.cardNo);
    if (card === null) {
        throw error(404, {
            message: "This card does not exist."
        });
    }

    const cardData: Card = card.get({plain: true});
    cardData.linkedBy = cardData.linkedBy.filter((l, i) => {
        const ii = cardData.linkedBy.findIndex(ll => l.skill.cardNo === ll.skill.cardNo);
        return i === ii;
    });

    const sameIdCards = await locals.db.Card.scope(["forLink"]).findAll({
        where: {
            cardId: cardData.cardId,
            cardNo: {
                [Op.not]: cardData.cardNo
            }
        },
        attributes: ["cardNo", "type"],
        include: [
            {model: locals.db.CardMemberExtraInfo, attributes: ["rarity"]},
            {model: locals.db.CardSongExtraInfo, attributes: ["rarity"]}
        ],
        order: cardOrder("`Card`.`CardNo`")
    });

    return {card: cardData, sameIdCards: sameIdCards.map((c: Card) => c.get({plain: true}))};
});