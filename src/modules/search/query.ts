import type SearchFilter from "$search/options";
import type Card from "$models/card/card";
import {cardOrder} from "$models/card/card";
import DB from "$models/db";
import type {Attributes, FindOptions, IncludeOptions, ProjectionAlias, WhereOptions} from "sequelize";

export function makeFindOptionsFromFilters(filters: SearchFilter[]): FindOptions<Attributes<Card>> {
    let where: WhereOptions = {};
    const include: Map<any, IncludeOptions> = new Map();

    for (const filter of filters) {
        where = {...where, ...filter.getWhereOptions()};
        for (let inclusion of filter.getIncludeOptions()) {
            if (include.has(inclusion.model)) {
                const inclInMap = include.get(inclusion.model)!;
                inclInMap.required = inclusion.required || inclInMap.required;
                if (inclInMap.hasOwnProperty("attributes")) {
                    if (inclusion.hasOwnProperty("attributes")) {
                        inclInMap.attributes = [
                            ...new Set((inclInMap.attributes as (string | ProjectionAlias)[])
                                .concat(inclusion.attributes as (string | ProjectionAlias)[]))
                                .values()
                        ]
                    } else {
                        delete inclInMap.attributes;
                    }
                }
            } else {
                include.set(inclusion.model, inclusion);
            }
        }
    }

    return {where, include: [...include.values()]}
}

export default async function searchQuery(filters: SearchFilter[], scope: string, options?: FindOptions<Attributes<Card>>): Promise<Card[]> {
    return await DB.Card.scope([scope]).findAll({
        ...makeFindOptionsFromFilters(filters),
        ...options,
        order: cardOrder("`Card`.`cardNo`")
    });
}