import { error, json } from "@sveltejs/kit";
import type Card from "$models/card/card.js";
import type SearchFilterError from "$lib/errors/searchFilterError.js";
import { queryMapToUrl, urlToQueryMap } from "$lib/search/querymap.js";
import type { SearchQueryMap } from "$lib/search/types.js";
import { type SearchFilter, queryMapToFilterList } from "$lib/server/search/filters.js";
import searchQuery from "$lib/server/search/query.js";
import type CardSearchResult from "$lib/types/cardSearchResult.js";
import type { RequestHandler } from "./$types.js";

const DEFAULT_PAGE_SIZE = 60;

export const GET: RequestHandler = (async ({ url }) => {
	// Use url instead of params.query to keep escaped characters, cut off origin and "/json/search/"
	let query: SearchQueryMap;
	try {
		query = urlToQueryMap(url.toString().substring(url.origin.length + 13));
	} catch (e) {
		throw error(400, { message: (e as SearchFilterError).message });
	}
	const page = query.page ?? 1;
	const pageSize = query.pagesize ?? DEFAULT_PAGE_SIZE;

	const filters: SearchFilter[] = queryMapToFilterList(query);
	if (filters.length === 0) {
		throw error(400, { message: "No search filters specified" });
	}

	const scope = await searchQuery(filters, ["viewForLink", "viewRarity", "orderCardNo"]);
	const { count, rows } = await scope.findAndCountAll({
		offset: (page - 1) * pageSize,
		limit: pageSize,
	});

	return json({
		cards: rows.map((c: Card) => c.get({ plain: true })),
		pagination: {
			page: page,
			totalResults: count,
			pageSize,
		},
		queryUrl: queryMapToUrl(query) + (pageSize !== DEFAULT_PAGE_SIZE ? `/pagesize=${pageSize}` : ""),
		queryExplain: filters.map((f) => f.explain),
	} as CardSearchResult<false>);
}) satisfies RequestHandler;
