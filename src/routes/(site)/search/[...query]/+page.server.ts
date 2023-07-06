import { error } from "@sveltejs/kit";
import type CardSearchResult from "$lib/types/cardSearchResult.js";
import { addPreparse } from "$lib/types/cardSearchResult.js";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = (async ({ params, fetch }) => {
    const res = await fetch(`/json/search/${params.query}`);
    if (!res.ok) {
        throw error(res.status, await res.json());
    }

    return addPreparse(await res.json()) as CardSearchResult<true>;
}) satisfies PageServerLoad;
