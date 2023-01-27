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

export function getKeyPrefix(subjects: (string | { from: string, to: string })[]) {
    if (subjects.length === 0) {
        return null;
    } else if (typeof subjects[0] === "string") {
        return subjects[0].split("-").at(-1)!;
    } else {
        return subjects[0].from.split("-").at(-1)!;
    }
}

export function getKey(prefix: string | null, key?: string) {
    if (key) {
        if (prefix) {
            return `${prefix}_${key}`;
        } else {
            return key;
        }
    } else {
        return prefix;
    }
}

export async function getFaqLinkLabel(DB: DBObject, link: string) {
    return (await DB.CardFAQLink.findOne({where: {link}}))?.label ?? "Unlabeled Link";
}

export function getLinkedCards(s: string) {
    const cards: string[] = [];
    function f(match: string, cardNo: string) {
        cards.push(cardNo);
        return match;
    }

    s.replace(/{{link:([^}]*?)}}/g, f);
    return cards;
}

export default async function prepareFaq(DB: DBObject, faq: Faq) {
    const cardsToLoad: string[] = [];
    const faqPromises: Promise<void>[] = [];

    const retFaq: FaqPrepared = {
        sections: faq.map(section => {
            const keyPrefix = getKeyPrefix(section.subjects);
            for (const subject of section.subjects) {
                if (typeof subject === "string") {
                    cardsToLoad.push(subject);
                } else {
                    cardsToLoad.push(subject.from);
                    cardsToLoad.push(subject.to);
                }
            }

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
                    faqPromises.push(getFaqLinkLabel(DB, seeAlso)
                        .then(label => {
                            faqObj.label = parseSkillToNodes(label, Language.ENG, true);
                        }));
                    return <FaqSeeAlsoPrepared>faqObj;
                }),
                qa: section.qa?.map(qa => {
                    cardsToLoad.push(...getLinkedCards(qa.question), ...getLinkedCards(qa.answer));
                    return <FaqQAPrepared>{
                        key: getKey(keyPrefix, qa.key),
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