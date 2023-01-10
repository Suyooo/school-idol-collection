import {error} from "@sveltejs/kit";
import type {PageLoad} from "./$types.js";

export const load: PageLoad = (async ({params, fetch}) => {
    const res = await fetch(`/json/set/${params.set}`);
    if (res.status === 404) {
        throw error(404, {
            message: "This set does not exist."
        });
    }

    return {cards: await res.json()};
}) satisfies PageLoad;