import { Op, literal } from "@sequelize/core";
import { error, json } from "@sveltejs/kit";
import type Card from "$models/card/card.js";
import { cardOrder } from "$models/card/card.js";
import AnnotationEnum from "$lib/enums/annotation.js";
import Language from "$lib/enums/language.js";
import { parseSkillToNodes } from "$lib/format/format.js";
import type CardPageExtraInfo from "$lib/types/cardPageExtraInfo.js";
import type { RequestHandler } from "./$types.js";

export const GET: RequestHandler = (async ({ params, locals }) => {
    const DB = await locals.DB;

    const options = params.options.split("/");
    const card = await DB.m.Card.findByPk(params.cardNo, {
        include: [
            {
                model: DB.m.Skill,
                include: [
                    {
                        model: DB.m.Annotation,
                        include: [{ model: DB.m.Card }],
                    },
                ],
            },
            {
                model: DB.m.CardMemberExtraInfo,
                include: [
                    {
                        model: DB.m.CardMemberGroup,
                        include: [
                            {
                                model: DB.m.Skill,
                                include: [
                                    {
                                        model: DB.m.Annotation,
                                        include: [DB.m.Card],
                                    },
                                ],
                            },
                            {
                                model: DB.m.CardMemberExtraInfo,
                                include: [
                                    {
                                        model: DB.m.Card,
                                        include: [DB.m.CardMemberExtraInfo],
                                    },
                                ],
                            },
                        ],
                    },
                    DB.m.CardMemberIdolizePieceExtraInfo,
                ],
            },
            {
                model: DB.m.CardSongExtraInfo,
                include: [DB.m.CardSongAnyReqExtraInfo, DB.m.CardSongAttrReqExtraInfo],
            },
            { model: DB.m.CardFAQLink },
            {
                model: DB.m.Annotation,
                where: {
                    type: {
                        [Op.in]: AnnotationEnum.allShowBacklink.map((a) => a.id),
                    },
                },
                required: false,
                include: [
                    {
                        model: DB.m.Skill,
                        include: [
                            {
                                model: DB.m.Card,
                                include: [
                                    { model: DB.m.CardMemberExtraInfo, attributes: ["rarity"] },
                                    { model: DB.m.CardSongExtraInfo, attributes: ["rarity"] },
                                ],
                            },
                            {
                                model: DB.m.CardMemberGroup,
                                include: [
                                    {
                                        model: DB.m.CardMemberExtraInfo,
                                        include: [DB.m.Card],
                                    },
                                ],
                            },
                        ],
                    },
                ],
                order: [literal("`linkedBy->skill`.`groupId`"), ...cardOrder("`linkedBy->skill`.`cardNo`")],
            },
        ],
    });

    if (card === null) {
        throw error(404, {
            message: "This card does not exist.",
        });
    }
    const cardData: Card & CardPageExtraInfo = card.get({ plain: true });

    cardData.cardSet = cardData.cardNo.split("-")[0];
    cardData.linkedBy = cardData.linkedBy.filter((l, i) => {
        // Filter this card itself
        if (l.skill.cardNo === cardData.cardNo) return false;
        // Filter duplicates
        if (l.skill.card) {
            if (i !== cardData.linkedBy.findIndex((ll) => l.skill.card!.id === ll.skill.card?.id)) return false;
        } else {
            if (i !== cardData.linkedBy.findIndex((ll) => l.skill.group!.id === ll.skill.group?.id)) return false;
        }
        // Filter cards already listed as group partners
        return !(
            cardData.member?.group && cardData.member.group.memberExtraInfos.some((m) => m.cardNo === l.skill.cardNo)
        );
    });

    if (options.some((o) => o === "sameid")) {
        cardData.sameId = await DB.m.Card.withScope(["viewForLink", "viewRarity", "orderCardNo"]).findAll({
            where: {
                id: cardData.id,
                cardNo: { [Op.not]: cardData.cardNo },
            },
        });
    }

    if (options.some((o) => o === "neighbors")) {
        cardData.prevCardNo =
            (await DB.m.Card.withScope(["viewCardNoOnly", { method: ["filterBefore", cardData.cardNo] }]).findOne())
                ?.cardNo ?? null;
        if (cardData.prevCardNo && cardData.prevCardNo.split("-")[0] !== cardData.cardSet) cardData.prevCardNo = null;
        cardData.nextCardNo =
            (await DB.m.Card.withScope(["viewCardNoOnly", { method: ["filterAfter", cardData.cardNo] }]).findOne())
                ?.cardNo ?? null;
        if (cardData.nextCardNo && cardData.nextCardNo.split("-")[0] !== cardData.cardSet) cardData.nextCardNo = null;
    }

    if (options.some((o) => o === "preparse")) {
        cardData.skills.forEach((skill) => {
            skill.jpnPreparsed = parseSkillToNodes(skill, Language.JPN, false, card.type);
            skill.engPreparsed = skill.eng ? parseSkillToNodes(skill, Language.ENG, false, card.type) : null;
        });
        if (cardData.member?.group) {
            cardData.member.group.skills.forEach((skill) => {
                skill.jpnPreparsed = parseSkillToNodes(skill, Language.JPN);
                skill.engPreparsed = skill.eng ? parseSkillToNodes(skill, Language.ENG) : null;
            });
        }
        for (const faq of cardData.faqs) {
            faq.labelPreparsed = parseSkillToNodes(faq.label, Language.ENG, true);
        }
    }

    return json(cardData);
}) satisfies RequestHandler;
