import DB from "../../models/db";
import express from "express";
import TranslationPattern from "../../models/translation/pattern";
import {getApplicableSkills, listUntranslatedSkills, splitTriggersFromSkill} from "../../translation/skills";

const PatternRouter = express.Router();
export default PatternRouter;

PatternRouter.get("/create/", async (req, res) => {
    res.render("pattern/create", {
        id: "undefined",
        example: "",
        triggerIds: [],
        regex: "^$",
        template: "",
        groupTypeIds: []
    });
});

PatternRouter.get("/create/:cardno/:line/", async (req, res) => {
    const card = await DB.Card.findByPk(req.params.cardno, {attributes: ["skill"]});
    const skillLine = card?.skills[parseInt(req.params.line)].jpn;
    if (skillLine === undefined) {
        res.status(404);
        res.send("");
        return;
    }

    const pattern = TranslationPattern.buildSkeletonFromSkill(skillLine);
    const {skill} = splitTriggersFromSkill(skillLine);
    res.render("pattern/create", {
        id: "undefined",
        example: skill,
        triggerIds: pattern.triggerArray.map(t => t.id),
        regex: pattern.regex,
        template: pattern.template,
        groupTypeIds: pattern.groupTypeArray.map(g => g.id)
    });
});

PatternRouter.get("/edit/:patternno/", async (req, res) => {
    const pattern = await DB.TranslationPattern.findByPk(parseInt(req.params.patternno));
    if (pattern === null) {
        res.status(404);
        res.send("");
        return;
    }

    res.render("pattern/create", {
        id: pattern.id,
        example: "",
        triggerIds: pattern.triggerArray.map(t => t.id),
        regex: pattern.regex,
        template: pattern.template,
        groupTypeIds: pattern.groupTypeArray.map(g => g.id)
    });
});

PatternRouter.get("/edit/:patternno/:cardno/:line/", async (req, res) => {
    const pattern = await DB.TranslationPattern.findByPk(parseInt(req.params.patternno));
    const card = await DB.Card.findByPk(req.params.cardno, {attributes: ["skill"]});
    const skillLine = card?.skills[parseInt(req.params.line)].jpn;
    if (pattern === null || skillLine === undefined) {
        res.status(404);
        res.send("");
        return;
    }

    const {skill} = splitTriggersFromSkill(skillLine);
    res.render("pattern/create", {
        id: pattern.id,
        example: skill,
        triggerIds: pattern.triggerArray.map(t => t.id),
        regex: pattern.regex,
        template: pattern.template,
        groupTypeIds: pattern.groupTypeArray.map(g => g.id)
    });
});

PatternRouter.get("/apply/:patternid/", async (req, res) => {
    const pattern = await DB.TranslationPattern.findByPk(parseInt(req.params.patternid));
    if (pattern === null) {
        res.status(404);
        res.send("");
        return;
    }

    res.render("pattern/apply", {
        id: pattern.id, applicable: await getApplicableSkills(pattern)
    });
});

PatternRouter.get("/untranslated/", async (req, res) => {
    res.render("pattern/untranslated", {
        untranslated: await listUntranslatedSkills()
    });
});