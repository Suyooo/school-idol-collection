import {cardLink} from "$lib/card/strings.js";
import Language from "$lib/enums/language.js";
import {isTextNode, parseSkillToNodes} from "$lib/format/format.js";
import type {ParseNodePrepared} from "$lib/format/format.js";
import type Card from "$models/card/card.js";
import type {DBObject} from "$models/db.js";

export type Faq = FaqSection[];

export interface FaqSection {
    subjects: (string | { from: string, to: string })[];
    notes?: string[];
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
    subjects: (string | { from: string, to: string })[];
    notes?: ParseNodePrepared[][];
    seeAlso?: FaqSeeAlsoPrepared[];
    qa?: FaqQAPrepared[];
}

export interface FaqSeeAlsoPrepared {
    link: string;
    label: ParseNodePrepared[];
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
            let keyPrefix: string = "";
            for (const subject of section.subjects) {
                if (typeof subject === "string") {
                    cardsToLoad.push(subject);
                    if (keyPrefix === "") keyPrefix = subject;
                } else {
                    cardsToLoad.push(subject.from);
                    cardsToLoad.push(subject.to);
                    if (keyPrefix === "") keyPrefix = subject.from;
                }
            }
            keyPrefix = keyPrefix.split("-").at(-1)!;

            if (section.qa && section.qa.length > 1 && section.qa.some(q => q.key === undefined)) {
                throw new Error("A FAQ section with multiple QAs must specify a key for each. " + JSON.stringify(section.subjects));
            }

            return <FaqSectionPrepared>{
                subjects: section.subjects,
                notes: section.notes?.map(n => parseSkillToNodes(n, Language.ENG, true)),
                seeAlso: section.seeAlso?.map(seeAlso => {
                    const faqObj = <Partial<FaqSeeAlsoPrepared>>{
                        link: seeAlso
                    };
                    faqPromises.push(DB.CardFAQLink.findOne({where: {link: seeAlso}})
                        .then(faqFromDb => {
                            faqObj.label = parseSkillToNodes(faqFromDb?.label ?? "Unlabeled Link", Language.ENG, true);
                        }));
                    return <FaqSeeAlsoPrepared>faqObj;
                }),
                qa: section.qa?.map(qa => {
                    qa.question.replace(/{{link:([^}]*?)}}/g, replFind);
                    qa.answer.replace(/{{link:([^}]*?)}}/g, replFind);

                    return <FaqQAPrepared>{
                        key: keyPrefix + (qa.key ? (keyPrefix ? "_" : "") + qa.key : ""),
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

    function replReplace(_match: string, cardNo: string) {
        return cardLink(retFaq.cards[cardNo]);
    }

    for (const section of retFaq.sections!) {
        if (section.qa) {
            for (const qa of section.qa) {
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
    }

    await Promise.all(faqPromises);
    return <FaqPrepared>retFaq;
}