import {error} from "@sveltejs/kit";
import type {PageLoad} from "./$types.js";

export const load: PageLoad = (async ({params, fetch}) => {
    const res = await fetch(`/json/search/${params.query}`);
    if (res.status === 404) {
        throw error(404, {
            message: "Invalid search query - " + (await res.json()).message
        });
    }

    return await res.json();
}) satisfies PageLoad;