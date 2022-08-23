import DB from "../../models/db";
import express from "express";
import SiteCardFormattingWrapper from "../../formatting/siteCardFormattingWrapper";
import {ModelType} from "sequelize-typescript";
import {Includeable, Op} from "sequelize";
import SearchFilterError from "../../errors/searchFilterError";
import CardType from "../../types/cardType";
import {getSearchFilter} from "../../search/options";
import searchQuery from "../../search/query";

const SearchRouter = express.Router();
export default SearchRouter;

SearchRouter.get("/*/", async (req, res) => {
    const filters = [];

    try {
        const filterStrings = (req.params as { "0": string })["0"].split("/");
        if (filterStrings.length === 0) {
            throw new SearchFilterError("No filters specified", "missing");
        }

        for (const filterString of filterStrings) {
            if (filterString.length === 0) continue;
            const split = filterString.split(":");
            filters.push(new (getSearchFilter(split[0]))(split));
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

    res.render("search", {
        "queries": filters.map(f => f.getExplainString()),
        "cards": (await searchQuery(filters)).map(c => new SiteCardFormattingWrapper(c, true))
    });
});