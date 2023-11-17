import type Card from "$models/card/card.js";
import type { PageServerLoad } from "./$types.js";

const latestCardNo = "PR-271";
const latestSetId = "LL17";
const latestSetCardNos = [
	[10, 9],
	[28, 9],
	[46, 9],
	[67, 9],
	[55, 4],
].map(([firstCard, maxDistance]) =>
	new Array(maxDistance).fill(0).map((_, i) => `${latestSetId}-${(firstCard + i).toString().padStart(3, "0")}`)
);

export const load: PageServerLoad = (async ({ locals }) => {
	const DB = await locals.DB;

	if (process.env.SIC_USE_TEST_DB === "1") {
		const card = await DB.m.Card.withScope(["viewForLink"])
			.findByPk("LL01-001")
			.then((r) => r!.get({ plain: true }));
		return {
			latestCard: card,
			latestSet: await DB.m.Set.findByPk("LL01").then((r) => r!.get({ plain: true })),
			latestSetCards: [[card], [card], [card]],
		};
	}

	const latestCard = DB.m.Card.withScope(["viewForLink"])
		.findByPk(latestCardNo)
		.then((c) => c!.get({ plain: true }));

	const latestSet = DB.m.Set.findByPk(latestSetId).then((s) => s!.get({ plain: true }));
	const latestSetCards = Promise.all(
		latestSetCardNos.map((slot) =>
			Promise.all(
				slot.map(
					(cardNo) =>
						DB.m.Card.withScope(["viewForLink"])
							.findByPk(cardNo)
							.then((c) => c!.get({ plain: true })) as Promise<Card>
				)
			)
		)
	);

	return {
		latestCard: await latestCard,
		latestSet: await latestSet,
		latestSetCards: await latestSetCards,
	};
}) satisfies PageServerLoad;
