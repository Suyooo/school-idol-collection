import { error, json } from "@sveltejs/kit";
import type Card from "$models/card/card.js";
import SearchFilterError from "$lib/errors/searchFilterError.js";
import { getSearchFilter } from "$lib/search/options.js";
import searchQuery from "$lib/search/query.js";
import Language from "../../../../lib/enums/language.js";
import { parseSkillToNodes } from "../../../../lib/format/format.js";
import type { RequestHandler } from "./$types.js";

const PAGE_SIZE = 60;

export const GET: RequestHandler = (async ({ params }) => {
    const filters = [];
    let includeUiParameters = false;
    let page = 1;

    try {
        const filterQueries = params.query.split(/(?<!\/)\/(?!\/)/g).map((f) => f.replace(/\/\//g, "/"));

        for (const filterQuery of filterQueries) {
            if (filterQuery === "ui") {
                includeUiParameters = true;
                continue;
            }
            if (filterQuery.startsWith("page:")) {
                page = parseInt(filterQuery.substring(5));
                continue;
            }
            if (filterQuery.length === 0) continue;
            const split = filterQuery.split(":");
            filters.push(new (getSearchFilter(split[0]))(split));
        }
    } catch (e) {
        if (e instanceof SearchFilterError) {
            throw error(404, { message: e.message });
        } else {
            throw e;
        }
    }

    if (filters.length === 0) {
        throw error(404, { message: "No search filters specified" });
    }

    let queryExplain = undefined;
    if (includeUiParameters) {
        queryExplain = filters.map((f) => parseSkillToNodes(f.getExplainString(), Language.ENG, true));
    }

    const query = await searchQuery(filters, ["viewForLink", "viewRarity", "orderCardNo"]);
    const { count, rows } = await query.findAndCountAll({
        offset: (page - 1) * PAGE_SIZE,
        limit: PAGE_SIZE,
    });

    return json({
        cards: rows.map((c: Card) => c.get({ plain: true })),
        pagination: {
            page: page,
            totalResults: count,
            pageSize: PAGE_SIZE,
        },
        queryUrl: filters.map((f) => f.getUrlPart()).join("/"),
        queryExplain,
    });
}) satisfies RequestHandler;
