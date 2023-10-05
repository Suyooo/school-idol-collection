import fs from "fs";
import { JSDOM } from "jsdom";

let cachedSetListDoc: undefined | Document = undefined;

export async function downloadCardImages(
    cardNo: string,
    set: string,
    overwrite: boolean,
    fetchFunc?: (url: string) => Promise<Response>,
    document?: Document
) {
    if (
        !overwrite &&
        fs.existsSync(`static/images/cards/${set}/${cardNo}-front.jpg`) &&
        fs.existsSync(`static/images/cards/${set}/${cardNo}-back.jpg`)
    ) {
        return;
    }
    console.log("Downloading", cardNo);

    if (!fetchFunc) fetchFunc = fetch;
    if (!document) {
        const cardRes = await fetchFunc(`https://lovelive-sic.com/cardlist/list/?cardno=${cardNo}`);
        if (!cardRes.ok) {
            throw `Status code ${cardRes.status} when fetching card page (${cardRes.statusText})`;
        }
        document = new JSDOM(await cardRes.text()).window.document;
    }

    // Always get images via the links on the card page, as the file names/direct URLs don't always match up...
    // For example, the card/set images for LL15 are in the "ll_16" subfolder
    if (!fs.existsSync(`static/images/cards/${set}`)) {
        fs.mkdirSync(`static/images/cards/${set}`, { recursive: true });
        const setLink = (document.querySelector(".button-container a:last-child") as HTMLAnchorElement).href;

        if (!cachedSetListDoc) {
            const setListRes = await fetchFunc(`https://lovelive-sic.com/cardlist/list/`);
            if (!setListRes.ok) {
                throw `Status code ${setListRes.status} when fetching set list page (${setListRes.statusText})`;
            }
            cachedSetListDoc = new JSDOM(await setListRes.text()).window.document;
        }

        const setUrl = (
            cachedSetListDoc!.querySelector(
                `.card-expansion-list li a[href='${setLink.substring(setLink.indexOf("/cardlist"))}'] img`
            ) as HTMLImageElement
        ).src;
        await downloadImage(fetchFunc, setUrl, `static/images/cards/${set}/set.jpg`);
    }

    const frontUrl = (document.querySelector(".illust-1 img") as HTMLImageElement).src;
    const backUrl = (document.querySelector(".illust-2 img") as HTMLImageElement).src;
    await Promise.all([
        downloadImage(fetchFunc, frontUrl, `static/images/cards/${set}/${cardNo}-front.jpg`),
        downloadImage(fetchFunc, backUrl, `static/images/cards/${set}/${cardNo}-back.jpg`),
    ]);
}

async function downloadImage(fetchFunc: (url: string) => Promise<Response>, url: string, filename: string) {
    if (url.endsWith("SECRET.jpg")) return;
    const res = await fetchFunc(url);
    if (res.ok && res.body) {
        const out = fs.createWriteStream(filename);
        const reader = res.body.getReader();
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                out.close();
                break;
            }
            out.write(value);
        }
    }

    // a little bit of throttle
    await new Promise((r) => setTimeout(r, 250));
}
