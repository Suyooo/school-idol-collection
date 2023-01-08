import type {PageServerLoad} from './$types';
import {error} from "@sveltejs/kit";
import type Card from "$models/card/card";

export const load = (async ({params, locals}) => {
    const cards = await locals.db.Card.scope(["forGrid", {method: ["set", params.set]}]).findAll();
    if (cards.length === 0) {
        throw error(404, {
            message: "This set does not exist."
        });
    }
    return <{ cards: Card[] }>{cards: cards.map((c: Card) => c.get({plain: true}))};
}) satisfies PageServerLoad;