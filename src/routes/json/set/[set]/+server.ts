import type Card from "$models/card/card.js";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types.js";

export const GET: RequestHandler = (async ({ params, locals }) => {
    const DB = await locals.DB;

    const set = await DB.m.Set.findByPk(params.set);
    if (set === null) {
        throw error(404, {
            message: "This set does not exist.",
        });
    }

    const cards = await DB.m.Card.withScope([
        "viewForLink",
        "viewRarity",
        "orderCardNo",
        { method: ["filterSet", params.set] },
    ]).findAll();
    if (cards.length === 0) {
        throw error(404, {
            message: "This set does not exist.",
        });
    }

    return json({ set: set.get({ plain: true }), cards: cards.map((c: Card) => c.get({ plain: true })) });
}) satisfies RequestHandler;
