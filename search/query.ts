import SearchFilter from "./options";
import Card, {CardOrder} from "../models/card/card";
import DB from "../models/db";
import {IncludeOptions, Model, ProjectionAlias, WhereOptions} from "sequelize";

export default async function searchQuery(filters: SearchFilter[]): Promise<Card[]> {
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

    return await DB.Card.findAll({where, include: [...include.values()], order: CardOrder("`Card`.`cardNo`")});
}