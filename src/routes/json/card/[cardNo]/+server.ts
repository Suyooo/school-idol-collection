import { Op, literal } from "@sequelize/core";
import { error, json } from "@sveltejs/kit";
import type Card from "$models/card/card.js";
import { cardOrder } from "$models/card/card.js";
import AnnotationEnum from "$lib/enums/annotation.js";
import type { RequestHandler } from "./$types.js";

export const GET: RequestHandler = (async ({ params, locals }) => {
	const DB = await locals.DB;

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
								model: DB.m.Card.withScope("viewForLink"),
							},
							{
								model: DB.m.CardMemberGroup,
								include: [
									{
										model: DB.m.CardMemberExtraInfo,
										include: [DB.m.Card.withScope("viewForLink")],
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
	const cardData: Card = card.get({ plain: true });

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
		return !(cardData.member?.group && cardData.member.group.memberExtraInfos.some((m) => m.cardNo === l.skill.cardNo));
	});

	return json(cardData);
}) satisfies RequestHandler;
