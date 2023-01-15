import {cardLink} from "$lib/card/strings.js";
import Language from "$lib/enums/language.js";
import {isTextNode, parseSkillToNodes} from "$lib/format/format.js";
import type {ParseNodePrepared} from "$lib/format/format.js";
import type Card from "$models/card/card.js";
import type {DBObject} from "$models/db.js";

export type Faq = FaqSection[];

export interface FaqSection {
    cardNo: string;
    rangeEndCardNo?: string;
    seeAlso?: string[];
    qa?: FaqQA[];
}

export interface FaqQA {
    key?: string;
    question: string;
    answer: string;
}

export type FaqPrepared = {
    sections: FaqSectionPrepared[];
    cards: { [key: string]: Card };
}

export interface FaqSectionPrepared {
    cardNo: string;
    rangeEndCardNo?: string;
    seeAlso?: FaqSeeAlsoPrepared[];
    qa?: FaqQAPrepared[];
}

export interface FaqSeeAlsoPrepared {
    link: string;
    label: string;
}

export interface FaqQAPrepared {
    key: string;
    question: ParseNodePrepared[];
    answer: ParseNodePrepared[];
}

export default async function prepareFaq(DB: DBObject, faq: Faq) {
    const cardsToLoad: string[] = [];
    const faqPromises: Promise<void>[] = [];

    function replFind(match: string, cardNo: string) {
        cardsToLoad.push(cardNo);
        return match;
    }

    const retFaq: FaqPrepared = {
        sections: faq.map(section => {
            cardsToLoad.push(section.cardNo);
            if (section.rangeEndCardNo) cardsToLoad.push(section.rangeEndCardNo);
            const keyPrefix = <string>section.cardNo.split("-").at(-1);

            return <FaqSectionPrepared>{
                cardNo: section.cardNo,
                rangeEndCardNo: section.rangeEndCardNo,
                seeAlso: section.seeAlso?.map(seeAlso => {
                    const link = seeAlso.substring(seeAlso.indexOf("/faq/"));
                    const faqObj = <FaqSeeAlsoPrepared>{
                        link, label: ""
                    };
                    faqPromises.push(DB.CardFAQLink.findOne({where: {link}})
                        .then(faqFromDb => {
                            faqObj.label = faqFromDb?.label ?? "Unlabeled Link";
                        }));
                    return faqObj;
                }),
                qa: section.qa?.map(qa => {
                    qa.question.replace(/{{link:([^}]*?)}}/g, replFind);
                    qa.answer.replace(/{{link:([^}]*?)}}/g, replFind);

                    return <FaqQAPrepared>{
                        key: keyPrefix + (qa.key ? "_" + qa.key : ""),
                        question: parseSkillToNodes(
                            qa.question.replace(/{{red:([^}]*?)}}/g, "<span class='text-highlight-red'>$1</span>"),
                            Language.ENG, true),
                        answer: parseSkillToNodes(
                            qa.answer.replace(/{{red:([^}]*?)}}/g, "<span class='text-highlight-red'>$1</span>"),
                            Language.ENG, true)
                    };
                })
            }
        }),
        cards: {}
    }

    const cards = await DB.Card.withScope(["viewForLink"])
        .findAll({where: {cardNo: cardsToLoad.filter((c, i) => cardsToLoad.indexOf(c) === i)}});
    for (const card of cards) {
        retFaq.cards[card.cardNo] = card.get({plain: true});
    }

    function replReplace(match: string, cardNo: string) {
        return cardLink(retFaq.cards[cardNo]);
    }

    for (const section of retFaq.sections!) {
        for (const qa of section.qa!) {
            for (const node of qa.question) {
                if (isTextNode(node)) {
                    node.text = node.text.replace(/{{link:([^}]*?)}}/g, replReplace);
                }
            }
            for (const node of qa.answer) {
                if (isTextNode(node)) {
                    node.text = node.text.replace(/{{link:([^}]*?)}}/g, replReplace);
                }
            }
        }
    }

    await Promise.all(faqPromises);
    return <FaqPrepared>retFaq;
}