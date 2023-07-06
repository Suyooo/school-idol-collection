import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types.js";

export const load: PageLoad = (async ({ fetch }) => {
    const res = await fetch("/json/sets");
    if (!res.ok) {
        throw error(res.status, await res.json());
    }

    return { categories: await res.json() };
}) satisfies PageLoad;
