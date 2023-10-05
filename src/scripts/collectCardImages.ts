import { JSDOM } from "jsdom";
import DBPromise from "$m/db.js";
import { downloadCardImages, saveResponseToFile } from "$l/card/download.js";
import { cardIsMember } from "$l/card/types.js";

(async () => {
    const DB = await DBPromise;

    for (const card of await DB.m.Card.findAll()) {
        if (cardIsMember(card)) {
            const memberExtraInfo = await DB.m.CardMemberExtraInfo.findByPk(card.cardNo);
            if (memberExtraInfo?.baseIfSecret) continue;
        }
        await downloadCardImages(card.cardNo, card.cardNo.split("-")[0], false);
    }

    const cardRes = await fetch(`https://lovelive-sic.com/cardlist/list/?cardno=LL01-085`);
    if (!cardRes.ok) {
        throw `Status code ${cardRes.status} when fetching page to grab secret image (${cardRes.statusText})`;
    }
    document = new JSDOM(await cardRes.text()).window.document;
    await fetch((document.querySelector(".illust-1 img") as HTMLImageElement).src).then(
        saveResponseToFile(`static/images/cards/secret.jpg`)
    );
})();
