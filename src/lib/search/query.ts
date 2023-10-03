import type { ModelStatic, ScopeOptions } from "@sequelize/core";
import type Card from "$m/card/card.js";
import DB from "$m/db.js";
import type SearchFilter from "$l/search/options.js";

export function getScopesFromFilters(filters: SearchFilter[]): (string | ScopeOptions)[] {
    return filters.map((f) => f.getScopeElements()).flat();
}

export default async function searchQuery(
    filters: SearchFilter[],
    scopes: (string | ScopeOptions)[] = []
): Promise<ModelStatic<Card>> {
    return (await DB).m.Card.withScope([...scopes, ...getScopesFromFilters(filters)]);
}
