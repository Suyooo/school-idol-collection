import DB from "../../models/db";
import express from "express";
import SiteCardFormattingWrapper from "../../formatting/siteCardFormattingWrapper";

const SetRouter = express.Router();
export default SetRouter;

SetRouter.get("/:set/", async (req, res) => {
    res.render("set", {
        "set": req.params.set,
        "cards": (await DB.Card.scope(["forGrid", {method: ["set", req.params.set]}]).findAll())
            .map(c => new SiteCardFormattingWrapper(c, true))
    });
});