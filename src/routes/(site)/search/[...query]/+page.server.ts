import type CardSearchResult from "$l/types/cardSearchResult.js";
import { addPreparse } from "$l/types/cardSearchResult.js";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = (async ({ params, fetch }) => {
    const res = await fetch(`/json/search/${params.query}`);
    if (!res.ok) {
        throw error(res.status, await res.json());
    }

    return addPreparse(await res.json()) as CardSearchResult<true>;
}) satisfies PageServerLoad;
