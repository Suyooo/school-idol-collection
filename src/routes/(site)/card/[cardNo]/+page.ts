import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types.js";

export const load: PageLoad = (async ({ params, fetch }) => {
    const res = await fetch(`/json/card/${params.cardNo}/sameid/neighbors/preparse`);
    if (!res.ok) {
        throw error(res.status, await res.json());
    }

    return { card: await res.json() };
}) satisfies PageLoad;
