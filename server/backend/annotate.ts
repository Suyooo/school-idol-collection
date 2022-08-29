import DB from "../../models/db";
import express from "express";
import Trigger, {TriggerID} from "../../translation/trigger";
import PatternGroupType, {PatternGroupTypeID} from "../../translation/patternGroupType";
import {applyPatternToSkills} from "../../translation/skills";

const APIAnnotateRouter = express.Router();
export default APIAnnotateRouter;

APIAnnotateRouter.put("/", async (req, res) => {
    if (req.body.id === undefined) {
        res.status(404);
        res.send("");
        return;
    }
    const skill = await DB.Skill.findByPk(req.body.id);
    if (skill === null) {
        res.status(404);
        res.json({success: false});
        return;
    }
    skill.jpn = req.body.skill;
    skill.eng = null;
    skill.patternId = null;
    await skill.save();
    res.json({success: true, id: skill.id});
});