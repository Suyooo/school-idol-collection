import type Card from "$m/card/card.js";
import type { PageServerLoad } from "./$types.js";

const latestCardNo = "PR-270";
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

    const latestCard = DB.m.Card.withScope(["viewForLink", "viewRarity"])
        .findByPk(latestCardNo)
        .then((c) => c!.get({ plain: true }));

    const latestSet = DB.m.Set.findByPk(latestSetId).then((s) => s!.get({ plain: true }));
    const latestSetCards = Promise.all(
        latestSetCardNos.map((slot) =>
            Promise.all(
                slot.map(
                    (cardNo) =>
                        DB.m.Card.withScope(["viewForLink", "viewRarity"])
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
