import SearchFilterError from "$lib/errors/searchFilterError.js";
import {error, json} from "@sveltejs/kit";
import Language from "../../../../lib/enums/language.js";
import {parseSkillToNodes} from "../../../../lib/format/format.js";
import type {RequestHandler} from './$types.js';
import type Card from "$models/card/card.js";
import {getSearchFilter} from "$lib/search/options.js";
import searchQuery from "$lib/search/query.js";

const PAGE_SIZE = 60;

export const GET: RequestHandler = (async ({params}) => {
    const filters = [];
    let preparseQuery = false;
    let page = 1;

    try {
        const explainString = params.query.split("/");

        for (const filterString of explainString) {
            if (filterString === "preparse") {
                preparseQuery = true;
                continue;
            }
            if (filterString.startsWith("page:")) {
                page = parseInt(filterString.substring(5));
                continue;
            }
            if (filterString.length === 0) continue;
            const split = filterString.split(":");
            filters.push(new (getSearchFilter(split[0]))(split));
        }
    } catch (e) {
        if (e instanceof SearchFilterError) {
            throw error(404, {message: e.message});
        } else {
            throw e;
        }
    }

    if (filters.length === 0) {
        throw error(404, {message: "No search filters specified"});
    }

    const {count, rows} = await searchQuery(filters, ["viewForLink", "viewRarity", "orderCardNo"]).findAndCountAll({
        offset: (page - 1) * PAGE_SIZE, limit: PAGE_SIZE
    });

    return json({
        "queryUrl": filters.map(f => f.getFilterString()).join("/"),
        "queryExplain": filters.map(f => preparseQuery ? parseSkillToNodes(f.getExplainString(), Language.ENG, true) : f.getExplainString()),
        "cards": rows.map((c: Card) => c.get({plain: true})),
        "pagination": {
            "page": page,
            "totalResults": count,
            "pageSize": PAGE_SIZE
        }
    });
}) satisfies RequestHandler;