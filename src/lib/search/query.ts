import type SearchFilter from "$lib/search/options.js";
import type Card from "$models/card/card.js";
import DB from "$models/db.js";
import type {Attributes, FindOptions, ScopeOptions} from "@sequelize/core";

export function getScopesFromFilters(filters: SearchFilter[]): (string | ScopeOptions)[] {
    return filters.map(f => f.getScopeElements()).flat();
}

export default async function searchQuery(filters: SearchFilter[],
                                          scopes: (string | ScopeOptions)[] = [],
                                          options: FindOptions<Attributes<Card>> = {}): Promise<Card[]> {
    return await DB.Card.withScope([...scopes, ...getScopesFromFilters(filters)]).findAll({...options});
}