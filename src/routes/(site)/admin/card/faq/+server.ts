import { Op } from "@sequelize/core";
import { error, json } from "@sveltejs/kit";
import type Card from "$models/card/card.js";
import { cardTitle } from "$lib/card/strings.js";
import { _data } from "../../../faq/[faqPage]/+page.server.js";
import { getFaqLinkLabel, getKey, getKeyPrefix, getLinkedCards } from "../../../faq/prepareFaq.js";
import type { RequestHandler } from "./$types.js";

export const POST: RequestHandler = (async ({ locals, request }) => {
	const faqName = (await request.json()).faqName;
	if (!_data.hasOwnProperty(faqName)) {
		throw error(404, { message: "This FAQ page does not exist." });
	}

	const DB = await locals.DB;

	const nextDisplayOrderCounters: { [cardId: number]: number } = {};
	await DB.transaction(async (transaction) => {
		for (const section of _data[faqName]) {
			if (
				section.qa === undefined &&
				section.seeAlso?.length === 1 &&
				section.seeAlso[0]
					.split("#")
					.at(-1)!
					.match(/(LL\d\d|EX\d\d|PR)-\d\d\d/)
			) {
				// This FAQ entry only links to another card's FAQ section, which means this card should already have
				// the FAQ links on its card page due to shared ID. Do not process this section
				continue;
			}

			const allSubjects: string[] = [];
			for (const subject of section.subjects) {
				if (typeof subject === "string") {
					allSubjects.push(subject);
				} else {
					let cur: string | null = subject.from;
					const startSet = cur.split("-")[0];
					allSubjects.push(cur);
					while (cur !== subject.to) {
						cur =
							(await DB.m.Card.withScope(["viewCardNoOnly", { method: ["filterAfter", cur] }]).findOne())?.cardNo ??
							null;
						if (cur === null || cur.split("-")[0] !== startSet) {
							throw error(500, { message: `Range ${subject.from} to ${subject.to} failed.` });
						}
						allSubjects.push(cur);
					}
				}
			}

			const subjectIds: number[] = [];
			for (const cardNo of allSubjects) {
				const id = (await DB.m.Card.withScope(["viewIdOnly"]).findOne({ where: { cardNo } }))?.id;
				if (id !== undefined && subjectIds.indexOf(id) === -1) {
					subjectIds.push(id);
				}
			}
			const keyPrefix = getKeyPrefix(section.subjects);

			if (section.seeAlso) {
				for (const seeAlso of section.seeAlso) {
					const label = await getFaqLinkLabel(await locals.DB, seeAlso);
					for (const cardId of subjectIds) {
						const displayOrder = nextDisplayOrderCounters[cardId] ?? 1;
						await DB.m.CardFAQLink.upsert({ cardId, displayOrder, label, link: seeAlso }, { transaction });
						nextDisplayOrderCounters[cardId] = displayOrder + 1;
					}
				}
			}

			if (section.qa) {
				for (const qa of section.qa) {
					const cardsToLoad = getLinkedCards(qa.question);
					const loadedCards = await DB.m.Card.withScope(["viewForLink"]).findAll({
						where: { cardNo: cardsToLoad.filter((c, i) => cardsToLoad.indexOf(c) === i) },
					});

					const cards: { [cardNo: string]: Card } = {};
					for (const card of loadedCards) {
						cards[card.cardNo] = card;
					}
					const label = qa.question
						.replace(/{{red:([^}]*?)}}/g, (_, text) => text)
						.replace(/{{link:([^}]*?)}}('s)?/g, (_, cardNo, possessive) => {
							if (possessive)
								return `<span class="whitespace-nowrap">${cardTitle(cards[cardNo], true)}${possessive}</span>`;
							return cardTitle(cards[cardNo], true);
						});

					let shortAnswer = null;
					if (qa.answer.startsWith("Yes.")) shortAnswer = "Yes.";
					if (qa.answer.startsWith("No.")) shortAnswer = "No.";

					for (const cardId of subjectIds) {
						const displayOrder = nextDisplayOrderCounters[cardId] ?? 1;
						await DB.m.CardFAQLink.upsert(
							{
								cardId,
								displayOrder,
								label,
								link: `/faq/${faqName}#${getKey(keyPrefix, qa)}`,
								shortAnswer,
							},
							{ transaction }
						);
						nextDisplayOrderCounters[cardId] = displayOrder + 1;
					}
				}
			}
		}

		for (const cardId in Object.keys(nextDisplayOrderCounters)) {
			await DB.m.CardFAQLink.destroy({
				where: { cardId, displayOrder: { [Op.gte]: nextDisplayOrderCounters[cardId] } },
				transaction,
			});
		}
	});

	return json({ success: true });
}) satisfies RequestHandler;
