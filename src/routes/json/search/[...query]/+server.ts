import { error, json } from "@sveltejs/kit";
import type Card from "$models/card/card.js";
import SearchFilterError from "$lib/errors/searchFilterError.js";
import { unescapeForSearch } from "$lib/search/escape.js";
import SearchFilter, { getSearchFilterConstructor } from "$lib/search/filters.js";
import searchQuery from "$lib/search/query.js";
import type CardSearchResult from "$lib/types/cardSearchResult.js";
import type { RequestHandler } from "./$types.js";

const PAGE_SIZE = 60;

export const GET: RequestHandler = (async ({ url, request }) => {
	const filters: SearchFilter[] = [];
	let page = 1;
	let pageSize = PAGE_SIZE;
	let pageSizeQuery = "";

	try {
		// We cannot use params.query - if there are encoded special characters, like ? or /, something still reads them
		// as the actual character, and will treat everything following them as search/hash parts etc.
		// Instead, take the full URL and cut off origin and /json/search/ to get the "real rest parameter"
		const query = url.toString().substring(url.origin.length + 13);

		for (const filter of query.split("/")) {
			const trim = filter.trim();
			if (trim.length === 0) continue;
			const [key, ...rest] = trim.split("=");
			if (key.length === 0) throw error(400, { message: `"${trim}" is missing a filter name` });
			const param = unescapeForSearch(rest.join("="));

			if (key === "page") {
				page = parseInt(param);
				if (isNaN(page)) {
					throw error(400, { message: "Parameter for page is not a number" });
				}
				continue;
			}
			if (key === "pagesize") {
				pageSize = parseInt(param);
				if (isNaN(pageSize)) {
					throw error(400, { message: "Parameter for pageSize is not a number" });
				}
				pageSizeQuery = "/pagesize=" + pageSize;
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
		queryUrl: filters.map((f) => f.getUrlPart()).join("/") + pageSizeQuery,
		queryExplain: filters.map((f) => f.getExplainString()),
	} as CardSearchResult<false>);
}) satisfies RequestHandler;
