import DB from "../../models/db";
import express from "express";
import SiteCardFormattingWrapper from "../../formatting/siteCardFormattingWrapper";
import {ModelType} from "sequelize-typescript";
import {Includeable, Op} from "sequelize";
import SearchFilterError from "../../errors/searchFilterError";
import CardType from "../../types/cardType";

const SearchRouter = express.Router();
export default SearchRouter;

function makeIncludable(model: ModelType<any, any>, includables?: Includeable[], required: boolean = true): Includeable {
    const ret: any = {
        model: model,
        attributes: [],
        required: required
    };
    if (includables !== undefined) {
        ret.include = includables;
    }
    return ret;
}

SearchRouter.get("/*/", async (req, res) => {
    let where: any = {};
    const queries: string[] = [];
    const includes = {
        "member": false
    };

    const setConditions = (filter: string, conditions: any) => {
        where = {...where, ...conditions};
    }

    try {
        const filters = (req.params as { "0": string })["0"].split("/");
        if (filters.length === 0) {
            throw new SearchFilterError("No filters specified", "missing");
        }

        for (const filter of filters) {
            if (filter.length === 0) continue;
            const splitAt = filter.split(":");
            if (splitAt.length === 1) {
                if (filter === "member") {
                    setConditions(filter, {"type": CardType.MEMBER});
                    queries.push("Members");
                } else if (filter === "song") {
                    setConditions(filter, {"type": CardType.SONG});
                    queries.push("Song");
                } else if (filter === "memory") {
                    setConditions(filter, {"type": CardType.MEMORY});
                    queries.push("Memory");
                } else {
                    throw new SearchFilterError("Unknown filter or wrong number of arguments", filter);
                }
            } else if (splitAt.length === 2) {
                const [key, value] = splitAt;
                if (key === "") {
                    throw new SearchFilterError("Filter has an empty name", filter);
                }
                if (value === "") {
                    throw new SearchFilterError("Filter has an empty argument", filter);
                }
                if (key === "name") {
                    setConditions(filter, {
                        [Op.or]: [
                            {"nameJpn": {[Op.like]: "%" + value + "%"}},
                            {"nameEng": {[Op.like]: "%" + value + "%"}}
                        ]
                    });
                    queries.push("Name contains \"" + value + "\"");
                } else if (key === "costume") {
                    setConditions(filter, {
                        [Op.or]: [
                            {"$member.costumeJpn$": {[Op.like]: "%" + value + "%"}},
                            {"$member.costumeEng": {[Op.like]: "%" + value + "%"}}
                        ]
                    });
                    queries.push("Costume contains \"" + value + "\"");
                    includes.member = true;
                } else if (key === "skill") {
                    setConditions(filter, {
                        [Op.or]: [
                            {"$skills.jpn$": {[Op.like]: "%" + value + "%"}},
                            {"$skills.eng$": {[Op.like]: "%" + value + "%"}}
                        ]
                    });
                    queries.push("Skill contains \"" + value + "\"");
                } else {
                    throw new SearchFilterError("Unknown filter or wrong number of arguments", filter);
                }
            } else {
                throw new SearchFilterError("Unknown filter or wrong number of arguments", filter);
            }
        }
    } catch (e) {
        if (e instanceof SearchFilterError) {
            res.status(404);
            res.send(e.message);
            return;
        } else {
            throw e;
        }
    }

    const includeArr = [];
    if (includes.member) {
        includeArr.push(makeIncludable(DB.CardMemberExtraInfo));
    }

    res.render("search", {
        "queries": queries,
        "cards": (await DB.Card.scope(["forGrid"]).findAll({
            where: where,
            include: includeArr
        })).map(c => new SiteCardFormattingWrapper(c, true))
    });
});