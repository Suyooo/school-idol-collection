import SearchFilterError from "$lib/errors/searchFilterError.js";
import {error, json} from "@sveltejs/kit";
import type {RequestHandler} from './$types.js';
import type Card from "$models/card/card.js";
import {getSearchFilter} from "$lib/search/options.js";
import searchQuery from "$lib/search/query.js";

export const GET: RequestHandler = (async ({params}) => {
    const filters = [];
    const filterStrings = params.query.split("/");

    try {
        for (const filterString of filterStrings) {
            if (filterString.length === 0) continue;
            const split = filterString.split(":");
            filters.push(new (getSearchFilter(split[0]))(split));
        }
    } catch (e) {
        if (e instanceof SearchFilterError) {
            error(404, e.message);
        } else {
            throw e;
        }
    }

    return json({
        "queries": filters.map(f => f.getExplainString()),
        "cards": (await searchQuery(filters, ["viewForLink", "viewRarity", "orderCardNo"])).map((c: Card) => c.get({plain: true}))
    });
}) satisfies RequestHandler;