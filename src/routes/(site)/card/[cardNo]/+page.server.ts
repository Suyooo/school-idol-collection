import { addExtraInfo } from "$lib/types/cardPageExtraInfo.js";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = (async ({ params, fetch, locals }) => {
    const res = await fetch(`/json/card/${params.cardNo}`);
    if (!res.ok) {
        throw error(res.status, await res.json());
    }
    return { card: addExtraInfo(await locals.DB, await res.json(), true, true, true) };
}) satisfies PageServerLoad;
