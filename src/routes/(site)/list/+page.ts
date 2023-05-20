import type { PageLoad } from "./$types.js";

export const load: PageLoad = (async ({ fetch }) => {
    const res = await fetch("/json/sets");
    return { categories: await res.json() };
}) satisfies PageLoad;
