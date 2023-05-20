import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types.js";

export const load: PageLoad = (async ({ params, fetch }) => {
    const res = await fetch(`/json/card/${params.cardNo}/sameid/neighbors/preparse`);
    if (res.status === 404) {
        throw error(404, {
            message: "This card does not exist.",
        });
    }

    return { card: await res.json() };
}) satisfies PageLoad;
