import { error, json } from "@sveltejs/kit";
import type Card from "$models/card/card.js";
import SearchFilterError from "$lib/errors/searchFilterError.js";
import { getSearchFilterConstructor } from "$lib/search/filters.js";
import searchQuery from "$lib/search/query.js";
import type CardSearchResult from "$lib/types/cardSearchResult.js";
import type { RequestHandler } from "./$types.js";

const PAGE_SIZE = 60;

export const GET: RequestHandler = (async ({ url }) => {
	const filters = [];
	let page = 1;

	try {
		for (const [key, param] of url.searchParams.entries()) {
			if (key === "page") {
				page = parseInt(param);
				continue;
			}
			filters.push(new (getSearchFilterConstructor(key))(param));
		}
	} catch (e) {
		if (e instanceof SearchFilterError) {
			throw error(400, { message: e.message });
		} else {
			throw e;
		}
	}

	if (filters.length === 0) {
		throw error(400, { message: "No search filters specified" });
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
		queryUrl: "?" + filters.map((f) => f.getUrlPart()).join("&"),
		queryExplain: filters.map((f) => f.getExplainString()),
	} as CardSearchResult<false>);
}) satisfies RequestHandler;
