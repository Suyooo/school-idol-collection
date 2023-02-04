import {cardTitle} from "$lib/card/strings.js";
import type Card from "$models/card/card.js";
import {Op} from "@sequelize/core";
import {data} from "../[faqPage]/+page.server.js";
import {error, json} from "@sveltejs/kit";
import {getFaqLinkLabel, getKey, getKeyPrefix, getLinkedCards} from "../prepareFaq.js";
import type {RequestHandler} from "./$types.js";

export const POST: RequestHandler = (async ({locals, request}) => {
    const faqName = (await request.json()).faqName;
    if (!data.hasOwnProperty(faqName)) {
        throw error(404, {message: "This FAQ page does not exist."});
    }

    locals.DB.sequelize.transaction(async transaction => {
        for (const section of data[faqName]) {
            const allSubjects: string[] = [];
            for (const subject of section.subjects) {
                if (typeof subject === "string") {
                    allSubjects.push(subject);
                } else {
                    let cur: string | null = subject.from;
                    allSubjects.push(cur);
                    while (cur !== subject.to) {
                        cur = (await locals.DB.Card
                            .withScope(["viewCardNoOnly", {method: ["filterAfter", cur]}]).findOne())?.cardNo ?? null;
                        if (cur === null || cur.split("-")[0] !== faqName) {
                            throw error(500, {message: `Range ${subject.from} to ${subject.to} failed.`});
                        }
                        allSubjects.push(cur);
                    }
                }
            }

            const subjectIds: number[] = [];
            for (const cardNo of allSubjects) {
                const id = (await locals.DB.Card.withScope(["viewIdOnly"]).findOne({where: {cardNo}}))?.id;
                if (id !== undefined && subjectIds.indexOf(id) === -1) {
                    subjectIds.push(id);
                }
            }
            let displayOrder = 1;
            const keyPrefix = getKeyPrefix(section.subjects);

            if (section.seeAlso) {
                for (const seeAlso of section.seeAlso) {
                    const label = await getFaqLinkLabel(locals.DB, seeAlso);
                    for (const cardId of subjectIds) {
                        await locals.DB.CardFAQLink.upsert({cardId, displayOrder, label, link: seeAlso}, {transaction});
                    }
                    displayOrder++;
                }
            }

            if (section.qa) {
                for (const qa of section.qa) {
                    const cardsToLoad = getLinkedCards(qa.question);
                    const loadedCards = await locals.DB.Card.withScope(["viewForLink"])
                        .findAll({where: {cardNo: cardsToLoad.filter((c, i) => cardsToLoad.indexOf(c) === i)}});

                    const cards: { [cardNo: string]: Card } = {};
                    for (const card of loadedCards) {
                        cards[card.cardNo] = card;
                    }
                    const label = qa.question
                        .replace(/{{red:([^}]*?)}}/g, (_, text) => text)
                        .replace(/{{link:([^}]*?)}}('s)?/g, (_, cardNo, possessive) => {
                            if (possessive) return `<span class="whitespace-nowrap">${cardTitle(cards[cardNo], true)}${possessive}</span>`
                            return cardTitle(cards[cardNo], true);
                        });

                    let shortAnswer = null;
                    if (qa.answer.startsWith("Yes.")) shortAnswer = "Yes.";
                    if (qa.answer.startsWith("No.")) shortAnswer = "No.";

                    for (const cardId of subjectIds) {
                        await locals.DB.CardFAQLink.upsert({
                            cardId,
                            displayOrder,
                            label,
                            link: `/faq/${faqName}#${getKey(keyPrefix, qa.key)}`,
                            shortAnswer
                        }, {transaction});
                    }
                    displayOrder++;
                }
            }

            await locals.DB.CardFAQLink.destroy({
                where: {cardId: subjectIds, displayOrder: {[Op.gte]: displayOrder}}, transaction
            });
        }
    });

    return json({success: true});
}) satisfies RequestHandler;