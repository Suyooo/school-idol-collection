import DBPromise from "$m/db.js";
import { downloadCardImages } from "$l/card/download.js";
import { cardIsMember } from "$l/card/types.js";

(async () => {
    const DB = await DBPromise;

    for (const card of await DB.m.Card.findAll()) {
        if (cardIsMember(card)) {
            const memberExtraInfo = await DB.m.CardMemberExtraInfo.findByPk(card.cardNo);
            if (memberExtraInfo?.baseIfSecret) continue;
        }
        downloadCardImages(card.cardNo, card.cardNo.split("-")[0], false);
    }
})();
