import type { ModelStatic, ScopeOptions } from "@sequelize/core";
import type Card from "$models/card/card.js";
import DB from "$models/db.js";
import type { SearchQueryMap } from "$lib/search/types.js";
import { type SearchFilter, queryMapToFilterList } from "./filters.js";

export function getScopesFromFilters(filters: SearchFilter[]): (string | ScopeOptions)[] {
	return filters.map((f) => f.scopes).flat();
}

export default async function searchQuery(
	query: SearchQueryMap | SearchFilter[],
	scopes: (string | ScopeOptions)[] = []
): Promise<ModelStatic<Card>> {
	return (await DB).m.Card.withScope([
		...scopes,
		...getScopesFromFilters(Array.isArray(query) ? query : queryMapToFilterList(query)),
	]);
}
