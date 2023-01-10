import type Card from "$models/card/card.js";
import {cardOrder} from "$models/card/card.js";
import AnnotationType from "$types/annotationType.js";
import type CardPageExtraInfo from "$types/cardPageExtraInfo.js";
import {literal, Op} from "@sequelize/core";
import {error, json} from "@sveltejs/kit";
import type {RequestHandler} from "./$types.js";

export const GET: RequestHandler = (async ({params, locals}) => {
    const card = await locals.DB.Card.findByPk(params.cardNo, {
        include: [
            {
                model: locals.DB.Skill,
                include: [{
                    model: locals.DB.Annotation,
                    include: [{model: locals.DB.Card}]
                }]
            },
            {
                model: locals.DB.CardMemberExtraInfo,
                include: [
                    {
                        model: locals.DB.CardMemberGroup,
                        include: [
                            {
                                model: locals.DB.Skill,
                                include: [{
                                    model: locals.DB.Annotation,
                                    include: [locals.DB.Card]
                                }]
                            },
                            {
                                model: locals.DB.CardMemberExtraInfo,
                                include: [
                                    {
                                        model: locals.DB.Card,
                                        include: [locals.DB.CardMemberExtraInfo]
                                    }
                                ]
                            }
                        ]
                    },
                    locals.DB.CardMemberIdolizePieceExtraInfo
                ]
            },
            {
                model: locals.DB.CardSongExtraInfo,
                include: [
                    locals.DB.CardSongAnyReqExtraInfo,
                    locals.DB.CardSongAttrReqExtraInfo
                ]
            },
            {model: locals.DB.CardFAQLink},
            {
                model: locals.DB.Annotation,
                where: {
                    type: {
                        [Op.in]: [
                            AnnotationType.get("song").id,
                            AnnotationType.get("costume").id,
                            AnnotationType.get("mem").id
                        ]
                    }
                },
                required: false,
                include: [{
                    model: locals.DB.Skill,
                    include: [
                        locals.DB.Card,
                        {
                            model: locals.DB.CardMemberGroup,
                            include: [{
                                model: locals.DB.CardMemberExtraInfo,
                                include: [locals.DB.Card]
                            }]
                        }
                    ]
                }],
                order: [literal("`linkedBy->skill`.`groupId`"), ...cardOrder("`linkedBy->skill`.`cardNo`")]
            }
        ]
    });

    if (card === null) {
        throw error(404, {
            message: "This card does not exist."
        });
    }
    const cardData: Card & CardPageExtraInfo = card.get({plain: true});

    cardData.cardSet = cardData.cardNo.split("-")[0];
    cardData.linkedBy.filter((l, i) =>
        i === cardData.linkedBy.findIndex(ll => l.skill.cardNo === ll.skill.cardNo));
    cardData.sameId = await locals.DB.Card.withScope(["viewForLink", "viewRarity", "orderCardNo"]).findAll({
        where: {
            id: cardData.id,
            cardNo: { [Op.not]: cardData.cardNo }
        }
    });
    cardData.prevCardNo = (await locals.DB.Card
        .withScope(["viewCardNoOnly", {method: ["filterBefore", cardData.cardNo]}]).findOne())?.cardNo ?? null;
    if (cardData.prevCardNo && cardData.prevCardNo.split("-")[0] !== cardData.cardSet) cardData.prevCardNo = null;
    cardData.nextCardNo = (await locals.DB.Card
        .withScope(["viewCardNoOnly",  {method: ["filterAfter", cardData.cardNo]}]).findOne())?.cardNo ?? null;
    if (cardData.nextCardNo && cardData.nextCardNo.split("-")[0] !== cardData.cardSet) cardData.nextCardNo = null;

    return json(cardData);
}) satisfies RequestHandler;