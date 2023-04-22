import type SearchFilter from "$lib/search/options.js";
import type Card from "$models/card/card.js";
import DB from "$models/db.js";
import type {ModelStatic, ScopeOptions} from "@sequelize/core";

export function getScopesFromFilters(filters: SearchFilter[]): (string | ScopeOptions)[] {
    return filters.map(f => f.getScopeElements()).flat();
}

export default function searchQuery(filters: SearchFilter[],
                                          scopes: (string | ScopeOptions)[] = []): ModelStatic<Card> {
    return DB.Card.withScope([...scopes, ...getScopesFromFilters(filters)]);
}