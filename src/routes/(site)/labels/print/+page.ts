import type Card from "$models/card/card.js";
import type {PageLoad} from "./$types.js";

export const load: PageLoad = (async ({params, fetch}) => {
    const cardNos = ["LL14-052", "LL14-057", "LL14-053", "LL15-051", "LL15-052", "LL15-053", "LL15-046", "LL15-047", "LL15-057", "LL15-089", "LL14-074"];
    const byCardNo: { [cardNo: string]: Card } = {};
    const byCardId: { [cardId: string]: Card } = {};
    await Promise.all(cardNos.map(c => fetch(`/json/card/${c}/preparse`).then(r => r.json()).then(c => {
        byCardNo[c.cardNo] = c;
        byCardId[c.id] = c;
    })));
    return {cardNos, byCardNo, byCardId};
}) satisfies PageLoad;