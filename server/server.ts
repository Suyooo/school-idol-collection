import express from 'express';
import bodyParser from 'body-parser';

import SkillFormatter from "../formatting/skillFormatter";

import IndexHandler from "./frontend/index";
import CardRouter from "./frontend/card";
import SetRouter from "./frontend/set";
import SearchRouter from "./frontend/search";
import AnnotateRouter from "./frontend/annotate";
import PatternRouter from "./frontend/pattern";
import FAQRouter from "./frontend/faq";

import APIAnnotateRouter from "./backend/annotate";
import APIPatternRouter from "./backend/pattern";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "server/frontend/views");
app.use(bodyParser.json());

app.use("/js", express.static("server/frontend/static/js"));
app.use("/style", express.static("server/frontend/static/style"));
app.use("/images", express.static("server/frontend/static/images"));
app.use("/vendor/jquery", express.static("node_modules/jquery/dist"));

app.locals.skillFormat = (skill: string) => SkillFormatter.ENG.formatText(skill);

/*
 * Frontends
 */

app.get("/", IndexHandler);
app.use("/set", SetRouter);
app.use("/card", CardRouter);

app.use("/search", SearchRouter);
app.use("/faq", FAQRouter);

app.use("/annotate", AnnotateRouter);
app.use("/pattern", PatternRouter);

/*
 * Backends
 */

app.use("/api/annotate", APIAnnotateRouter);
app.use("/api/pattern", APIPatternRouter);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});