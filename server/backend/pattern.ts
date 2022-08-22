import DB from "../../models/db";
import express from "express";
import Trigger, {TriggerID} from "../../types/trigger";
import PatternGroupType, {PatternGroupTypeID} from "../../types/patternGroupType";
import {applyPatternToSkills} from "../../translation/skills";

const APIPatternRouter = express.Router();
export default APIPatternRouter;

APIPatternRouter.put("/", async (req, res) => {
    let pattern;
    if (req.body.id === undefined) {
        pattern = DB.TranslationPattern.build(req.body);
    } else {
        pattern = await DB.TranslationPattern.findByPk(req.body.id);
        if (pattern === null) {
            res.status(404);
            res.json({success: false});
            return;
        }
        pattern.set(req.body);
    }
    pattern.triggerArray = req.body.triggerIds.map((t: TriggerID) => Trigger.get(t));
    pattern.groupTypeArray = req.body.groupTypeIds.map((g: PatternGroupTypeID) => PatternGroupType.get(g));
    await pattern.save();
    res.json({success: true, id: pattern.id});
});

APIPatternRouter.put("/apply/", async (req, res) => {
    const pattern = await DB.TranslationPattern.findByPk(req.body.id);
    if (pattern === null) {
        res.status(404);
        res.json({success: false});
        return;
    }

    await applyPatternToSkills(pattern, req.body.applyTo);
    res.json({success: true});
});