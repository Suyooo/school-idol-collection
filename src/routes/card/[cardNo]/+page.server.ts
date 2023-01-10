import type {PageServerLoad} from "./$types.js";
import {error} from "@sveltejs/kit";
import {Op} from "@sequelize/core";
import type Card from "$models/card/card.js";

export const load: PageServerLoad = (async ({params, locals}) => {
    const card = await locals.db.Card.withScope(["viewFull"]).findByPk(params.cardNo);
    if (card === null) {
        throw error(404, {
            message: "This card does not exist."
        });
    }

    const cardData: Card = card.get({plain: true});
    cardData.linkedBy.filter((l, i) => {
        const ii = cardData.linkedBy.findIndex(ll => l.skill.cardNo === ll.skill.cardNo);
        return i === ii;
    });

    const sameIdCards = await locals.db.Card.withScope(["viewForLink", "viewRarity", "orderCardNo"]).findAll({
        where: {
            id: cardData.id,
            cardNo: { [Op.not]: cardData.cardNo }
        }
    });

    return {card: cardData, sameIdCards: sameIdCards.map((c: Card) => c.get({plain: true}))};
});