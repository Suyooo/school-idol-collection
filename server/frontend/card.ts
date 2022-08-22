import DB from "../../models/db";
import express from "express";
import {Op} from "sequelize";
import SiteCardFormattingWrapper from "../../formatting/siteCardFormattingWrapper";

const CardRouter = express.Router();
export default CardRouter;

CardRouter.get("/:cardno/", async (req, res) => {
    const card = await DB.Card.scope(["full"]).findByPk(req.params.cardno);
    if (card == undefined) {
        res.status(404);
        res.send("Card not found.");
    } else {
        const sameIdCards = await DB.Card.scope(["forLink"]).findAll({
            where: {
                id: card.id,
                cardNo: {
                    [Op.not]: card.cardNo
                }
            },
            attributes: ["cardNo", "type"],
            include: [
                {model: DB.CardMemberExtraInfo, attributes: ["rarity"]},
                {model: DB.CardSongExtraInfo, attributes: ["rarity"]}
            ]
        });
        const formattingWrapper = new SiteCardFormattingWrapper(card);
        await formattingWrapper.prepareAsyncProperties();
        res.render("card", {
            "f": formattingWrapper,
            "sameId": sameIdCards.map(c => new SiteCardFormattingWrapper(c))
        });
    }
});