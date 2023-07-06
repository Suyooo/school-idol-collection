import { error, json } from "@sveltejs/kit";
import type Card from "$models/card/card.js";
import type { RequestHandler } from "./$types.js";

export const GET: RequestHandler = (async ({ params, locals }) => {
    const cards = await (
        await locals.DB
    ).m.Card.withScope(["viewForLink", "viewRarity", "orderCardNo", { method: ["filterSet", params.set] }]).findAll();
    if (cards.length === 0) {
        throw error(404, {
            message: "This set does not exist.",
        });
    }
    return json(cards.map((c: Card) => c.get({ plain: true })));
}) satisfies RequestHandler;
