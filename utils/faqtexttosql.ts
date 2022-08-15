import {loadCardFromCardNo} from "../cards/loader";
import {Card} from "../models/card/card";
import DB from "./db";
import * as fs from "fs";

const faqpage = "/faq/LL05";
let faqtext = fs.readFileSync("frontend/views/faq/ll05.ejs").toString();

const insertFaqStmt = DB.prepare("INSERT OR REPLACE INTO cards_faq_links VALUES(?,?,?,?)");

faqtext = faqtext.replace(/<%- skillFormat\("([\s\S]*?)", ?1, ?false\) %>/g, (match, p1) => p1.replace(/\\"/g, "\""));
faqtext = faqtext.replace(/<%- ([\s\S]*?) %>/g, "");
faqtext = faqtext.replace(/<span class="redtext">([\s\S]*?)<\/span>/g, "$1");
faqtext = faqtext.replace(/<a href="\/card\/[\s\S]*?">([\s\S]*?)<\/a>/g, "$1");
faqtext = faqtext.replace(/<div class="content">([\s\S]*)<\/div>/, "$1");
faqtext = faqtext.replace(/<div class="panel">([\s\S]*)<\/div>/, "$1");
faqtext = faqtext.replace(/<div class="panel-inner">([\s\S]*)<\/div>/, "$1");
faqtext = faqtext.replace(/<h4>([\s\S]*?)<\/h4>/g, "").trim();
faqtext = faqtext.replace(/^ */gm, "");
faqtext = faqtext.replace(/\n/g, " ");

let currentIds: number[] = [];
let count = 1;
while (faqtext.length > 0) {
    if (faqtext.startsWith("<h5>")) {
        let content = "";
        faqtext = faqtext.replace(/^<h5>([\s\S]*?)<\/h5>/, (match, c) => {
            content = c;
            return "";
        });
        currentIds = [];
        let foundMatches = [...content.matchAll(/([A-Z0-9\-]*?) "[\s\S]*?"/g)];
        let foundNos: string[];
        if (foundMatches.length == 1) {
            foundNos = [foundMatches[0][1]];
        } else {
            let curId = foundMatches[0][1];
            foundNos = [curId];
            while (curId != foundMatches[1][1]) {
                curId = curId.split("-")[0] + "-" + ("" + (Number(curId.split("-")[1]) + 1)).padStart(3, "0");
                foundNos.push(curId);
            }
        }

        for (const cardno of foundNos) {
            const c: Card | undefined = loadCardFromCardNo(cardno);
            if (c != undefined) currentIds.push(c.id);
        }
        count = 1;
    } else if (faqtext.startsWith("<div class=\"seealso\"")) {
        let link = "", label = "";
        faqtext = faqtext.replace(/^<div class="seealso"> See also: <a href="([\s\S]*?)">([\s\S]*?)<\/a> <\/div>/, (match, l1, l2) => {
            link = l1;
            label = l2;
            return "";
        });
        for (const cardId of currentIds) {
            insertFaqStmt.run(cardId, count, label, link);
        }
        count++;
    } else if (faqtext.startsWith("<div class=\"question\"")) {
        let anchor = "", question = "";
        faqtext = faqtext.replace(/^<div class="question" id="([\s\S]*?)"> ([\s\S]*?) <\/div>/, (match, l1, l2) => {
            anchor = l1;
            question = l2;
            return "";
        });
        for (const cardId of currentIds) {
            insertFaqStmt.run(cardId, count, question, faqpage + "#" + anchor);
        }
        count++;
    } else if (faqtext.startsWith("<div class=\"answer\"")) {
        faqtext = faqtext.replace(/^<div class="answer"> ([\s\S]*?) <\/div>/, "");
    } else {
        break;
    }
    faqtext = faqtext.trim();
}