import type Card from "$models/card/card.js";
import type { PageServerLoad } from "./$types.js";

const latestCardNo = "PR-277";
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
const latestSetCardHighlightId = [2, 0];

export const load: PageServerLoad = (async ({ locals }) => {
	const DB = await locals.DB;

	if (__SIC_TEST_SEARCH_USE_DUMMY_DB__ === 1) {
		const latestCard = await DB.m.Card.withScope(["viewForLink"])
			.findByPk("LL01-001")
			.then((r) => r!.get({ plain: true }));
		return {
			latestCard,
			latestSet: DB.m.Set.findByPk("LL01").then((r) => r!.get({ plain: true })),
			latestSetCards: [[latestCard]],
			latestSetCardHighlightId: [0, 0],
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

	return { latestCard, latestSet, latestSetCards, latestSetCardHighlightId };
}) satisfies PageServerLoad;
