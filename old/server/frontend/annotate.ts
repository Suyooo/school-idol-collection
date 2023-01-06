import DB from "../../models/db";
import express from "express";

const AnnotateRouter = express.Router();
export default AnnotateRouter;

AnnotateRouter.get("/edit/:skillno/", async (req, res) => {
    const skill = await DB.Skill.findByPk(parseInt(req.params.skillno));
    if (skill === null) {
        res.status(404);
        res.send("");
        return;
    }

    res.render("annotate/edit", {
        id: skill.id,
        skill: skill.jpn,
        cardno: skill.cardNo || (await DB.CardMemberGroup.findByPk(skill.groupId!, {include: DB.CardMemberExtraInfo}))!.memberExtraInfos[0].cardNo
    });
});