import type { ModelStatic, ScopeOptions } from "@sequelize/core";
import type Card from "$models/card/card.js";
import DB from "$models/db.js";
import type SearchFilter from "$lib/search/options.js";

export function getScopesFromFilters(filters: SearchFilter[]): (string | ScopeOptions)[] {
    return filters.map((f) => f.getScopeElements()).flat();
}

export default async function searchQuery(
    filters: SearchFilter[],
    scopes: (string | ScopeOptions)[] = []
): Promise<ModelStatic<Card>> {
    return (await DB).models.Card.withScope([...scopes, ...getScopesFromFilters(filters)]);
}
