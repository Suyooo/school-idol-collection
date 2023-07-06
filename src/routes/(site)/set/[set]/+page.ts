import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types.js";

export const load: PageLoad = (async ({ params, fetch }) => {
    const res = await fetch(`/json/set/${params.set}`);
    if (!res.ok) {
        throw error(res.status, await res.json());
    }

    return { cards: await res.json() };
}) satisfies PageLoad;
