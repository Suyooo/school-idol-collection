import { json } from "@sveltejs/kit";
import type Card from "$m/card/card.js";
import AnnotationEnum from "$l/enums/annotation.js";
import searchQuery from "$l/search/query.js";
import type { CheckResult } from "../+server.js";
import type { RequestHandler } from "./$types.js";

export const POST: RequestHandler = (async ({ locals, request }) => {
    const DB = await locals.DB;
    const { annotationJpn, annotationEng } = await request.json();

    const key = annotationJpn.split(":")[0].substring(2);
    const annotation = AnnotationEnum.fromKey(key);
    const jpn = annotationJpn.substring(key.length + 3, annotationJpn.length - 2);
    const eng = annotationEng.substring(key.length + 3, annotationEng.length - 2);

    const [jpnCards, engCards] = await Promise.all([
        (await searchQuery(annotation.getSearchFilters(jpn), ["viewCardNoOnly"])).findAll(),
        (await searchQuery(annotation.getSearchFilters(eng), ["viewCardNoOnly"])).findAll(),
    ]);

    const jpnCardNos = new Set(jpnCards.map((c) => c.cardNo));
    const engCardNos = new Set(engCards.map((c) => c.cardNo));

    const common: string[] = [];
    for (const c of jpnCardNos) {
        if (engCardNos.has(c)) {
            jpnCardNos.delete(c);
            engCardNos.delete(c);
            common.push(c);
        }
    }

    return json({ common, onlyInJpn: [...jpnCardNos], onlyInEng: [...engCardNos] } as CheckResult);
}) satisfies RequestHandler;
