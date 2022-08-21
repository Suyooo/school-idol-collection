import express from 'express';
import bodyParser from 'body-parser';
import SiteCardFormattingWrapper from "../formatting/siteCardFormattingWrapper";
import {
    listUntranslatedSkills,
    getApplicableSkills,
    applyPatternToSkills,
    splitTriggersFromSkill
} from "../translation/skills";
import DB from "../models/db";
import {ModelType} from "sequelize-typescript";
import {Includeable, Op} from "sequelize";
import SkillFormatter from "../formatting/skillFormatter";
import TranslateTablePattern from "../models/translatetables/pattern";
import Trigger, {TriggerID} from "../types/trigger";
import PatternGroupType, {PatternGroupTypeID} from "../types/patternGroupType";
import CardType from "../types/cardType";
import SearchFilterError from "../errors/searchFilterError";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "frontend/views");
app.use(bodyParser.json());

app.use("/js", express.static("frontend/static/js"));
app.use("/style", express.static("frontend/static/style"));
app.use("/images", express.static("frontend/static/images"));
app.use("/vendor/jquery", express.static("node_modules/jquery/dist"));

app.locals.skillFormat = (skill: string) => SkillFormatter.ENG.formatText([skill])

const cardnoPattern = /^(?:PR-\d\d\d[AB]?|(?:LL|EX)\d\d-[\dE]\d\d)$/;
const setPattern = /^(?:PR|(?:LL|EX)\d\d)$/;

app.param("cardno", function (req, res, next, cardno) {
    if (cardnoPattern.test(cardno)) {
        req.params.cardno = cardno;
        next();
    } else {
        throw new Error("Invalid Card No");
    }
});

app.param("set", function (req, res, next, set) {
    if (setPattern.test(set)) {
        req.params.set = set;
        next();
    } else {
        throw new Error("Invalid Set");
    }
});

/*
 * Frontends
 */


app.get("/", (req, res) => {
    res.render("index", {
        main: [
            {set: "LL01", name: "Volume 1"},
            {set: "LL02", name: "Volume 2"},
            {set: "LL03", name: "Volume 3"},
            {set: "LL04", name: "Volume 4"},
            {set: "LL05", name: "Volume 5 (Sunshine TV Anime Edition)"},
            {set: "LL06", name: "Volume 6"},
            {set: "EX05", name: "SIF Fes 2017 µ's Special Pack"},
            {set: "LL07", name: "Volume 7"},
            {set: "LL08", name: "Volume 8"},
            {set: "EX11", name: "SIF Fes 2018 µ's Special Pack"},
            {set: "LL09", name: "Volume 9"},
            {set: "LL10", name: "Volume 10"},
            {set: "LL11", name: "Volume 11"},
            {set: "LL12", name: "Volume 12"},
            {set: "LL13", name: "Volume 13"},
            {set: "LL14", name: "Volume 14"},
            {set: "LL15", name: "Volume 15"},
            {set: "LL16", name: "Volume 16"},
            {set: "LL17", name: "Volume 17"}
        ],
        trial: [
            {set: "EX01", name: "µ's Trial Set"},
            {set: "EX03", name: "Aqours Trial Set"},
            {set: "EX09", name: "Aqours Trial Set Part 2"}
        ],
        pr: [
            {set: "PR", name: "Promo Cards"}
        ],
        other: [
            {set: "EX02", name: "Fancy Changing Cards Set"},
            {set: "EX06", name: "Fancy Changing Cards Set 2017 µ's"},
            {set: "EX07", name: "Fancy Changing Cards Set 2017 Aqours"},
            {set: "EX10", name: "Acrylic Keyholder Set"},
            {set: "EX04", name: "Sparkly Cards & Clear Holder Set Part 1"},
            {set: "EX08", name: "Sparkly Cards & Clear Holder Set Part 2"},
            {set: "EX12", name: "SIF Honor Student Scouting Box"},
            {set: "EX13", name: "Stand-Up Pop Collection"},
            {set: "EX14", name: "SP Guaranteed! Starter Scouting Box"},
            {set: "EX15", name: "µ's SIF Special Student Scouting Box"},
        ]
    });
});

app.get("/set/:set/", async (req, res) => {
    res.render("set", {
        "set": req.params.set,
        "cards": (await DB.Card.scope(["forGrid", {method: ["set", req.params.set]}]).findAll())
            .map(c => new SiteCardFormattingWrapper(c, true))
    });
});

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

app.get("/search/*/", async (req, res) => {
    let where: any = {};
    const queries: string[] = [];
    const includes = {
        "translationSkill": false,
        "member": false,
        "translationCostume": false
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
                            {"name": {[Op.like]: "%" + value + "%"}},
                            {"$_nameEng.name$": {[Op.like]: "%" + value + "%"}}
                        ]
                    });
                    queries.push("Name contains \"" + value + "\"");
                } else if (key === "costume") {
                    setConditions(filter, {
                        [Op.or]: [
                            {"$member.costume$": {[Op.like]: "%" + value + "%"}},
                            {"$member._costumeEng.costume$": {[Op.like]: "%" + value + "%"}}
                        ]
                    });
                    queries.push("Costume contains \"" + value + "\"");
                    includes.member = true;
                    includes.translationCostume = true;
                } else if (key === "skill") {
                    setConditions(filter, {
                        [Op.or]: [
                            {"skill": {[Op.like]: "%" + value + "%"}},
                            {"$_skillLinesEng.skill$": {[Op.like]: "%" + value + "%"}}
                        ]
                    });
                    queries.push("Skill contains \"" + value + "\"");
                    includes.translationSkill = true;
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
    if (includes.translationSkill) {
        includeArr.push(makeIncludable(DB.TranslationSkill, undefined, false));
    }
    if (includes.member) {
        includeArr.push(makeIncludable(DB.CardMemberExtraInfo, includes.translationCostume
            ? [makeIncludable(DB.TranslationCostume, undefined, false)]
            : undefined));
    }

    res.render("search", {
        "queries": queries,
        "cards": (await DB.Card.scope(["forGrid"]).findAll({
            where: where,
            include: includeArr
        })).map(c => new SiteCardFormattingWrapper(c, true))
    });
});

app.get("/card/:cardno/", async (req, res) => {
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

app.get("/pattern/create/", async (req, res) => {
    res.render("pattern/create", {
        id: "undefined",
        example: "",
        triggerIds: [],
        regex: "^$",
        template: "",
        groupTypeIds: []
    });
});

app.get("/pattern/create/:cardno/:line/", async (req, res) => {
    const card = await DB.Card.findByPk(req.params.cardno, {attributes: ["skill"]});
    const skillLine = card?.skill?.split("\n")[parseInt(req.params.line)];
    if (skillLine === undefined) {
        res.status(404);
        res.send("");
        return;
    }

    const pattern = TranslateTablePattern.buildSkeletonFromSkill(skillLine);
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

app.get("/pattern/edit/:patternno/", async (req, res) => {
    const pattern = await DB.TranslateTablePattern.findByPk(parseInt(req.params.patternno));
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

app.get("/pattern/edit/:patternno/:cardno/:line/", async (req, res) => {
    const pattern = await DB.TranslateTablePattern.findByPk(parseInt(req.params.patternno));
    const card = await DB.Card.findByPk(req.params.cardno, {attributes: ["skill"]});
    const skillLine = card?.skill?.split("\n")[parseInt(req.params.line)];
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

app.get("/pattern/apply/:patternid/", async (req, res) => {
    const pattern = await DB.TranslateTablePattern.findByPk(parseInt(req.params.patternid));
    if (pattern === null) {
        res.status(404);
        res.send("");
        return;
    }

    res.render("pattern/apply", {
        id: pattern.id, applicable: await getApplicableSkills(pattern)
    });
});

app.get("/pattern/untranslated/", async (req, res) => {
    res.render("pattern/untranslated", {
        untranslated: await listUntranslatedSkills()
    });
});

const faqpages = ["general", "rules", "ll01", "ll02", "ll03", "ll04", "ll05", "ll06"];

app.get("/faq/", (req, res) => {
    res.render("faq/index");
});

app.get("/faq/:faq/", (req, res) => {
    req.params.faq = req.params.faq.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
    if (faqpages.indexOf(req.params.faq) === -1) req.params.faq = "index";
    res.render("faq/" + req.params.faq);
});

/*
 * JSON
 */

app.put('/pattern/', async (req, res, next) => {
    let pattern;
    if (req.body.id === undefined) {
        pattern = DB.TranslateTablePattern.build(req.body);
    } else {
        pattern = await DB.TranslateTablePattern.findByPk(req.body.id);
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

app.put('/pattern/apply/', async (req, res, next) => {
    const pattern = await DB.TranslateTablePattern.findByPk(req.body.id);
    if (pattern === null) {
        res.status(404);
        res.json({success: false});
        return;
    }

    await applyPatternToSkills(pattern, req.body.applyTo);
    res.json({success: true});
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});