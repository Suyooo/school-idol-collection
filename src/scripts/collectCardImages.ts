import fs from "fs";
import { JSDOM } from "jsdom";
import DBPromise from "$models/db.js";
import { downloadCardImages, saveResponseToFile } from "$lib/card/download.js";
import { cardIsMember } from "$lib/card/types.js";

(async () => {
	const DB = await DBPromise;

	console.log("Collecting card images...");
	let anyDownloaded = false;
	fs.mkdirSync(`static/images/cards`, { recursive: true });

	for (const card of await DB.m.Card.findAll()) {
		if (cardIsMember(card)) {
			const memberExtraInfo = await DB.m.CardMemberExtraInfo.findByPk(card.cardNo);
			if (memberExtraInfo?.baseIfSecret) continue;
		}

		const set = card.cardNo.split("-")[0];

		if (
			fs.existsSync(`static/images/cards/${set}/${card.cardNo}-front.jpg`) &&
			fs.existsSync(`static/images/cards/${set}/${card.cardNo}-back.jpg`)
		) {
			continue;
		}
		console.log(`    Downloading images for ${card.cardNo}...`);
		anyDownloaded = true;
		await downloadCardImages(card.cardNo, set);
	}

	if (!fs.existsSync(`static/images/cards/secret.jpg`)) {
		console.log("    Downloading secret image...");
		const cardRes = await fetch(`https://lovelive-sic.com/cardlist/list/?cardno=LL01-085`);
		if (!cardRes.ok) {
			throw `Status code ${cardRes.status} when fetching page to grab secret image (${cardRes.statusText})`;
		}
		const document = new JSDOM(await cardRes.text()).window.document;
		await fetch((document.querySelector(".illust-1 img") as HTMLImageElement).src).then(
			saveResponseToFile(`static/images/cards/secret.jpg`)
		);
		anyDownloaded = true;
	}

	if (anyDownloaded) console.log("Done.");
	else console.log("Nothing to do.");
})().then(() => process.exit(0));
