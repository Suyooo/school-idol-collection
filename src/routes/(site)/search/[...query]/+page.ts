import { error } from "@sveltejs/kit";
import type CardSearchResult from "$lib/types/cardSearchResult.js";
import type { PageLoad } from "./$types.js";

export const load: PageLoad = (async ({ params, fetch }) => {
    const res = await fetch(`/json/search/ui/${params.query}`);
    if (!res.ok) {
        throw error(res.status, await res.json());
    }

    return (await res.json()) as CardSearchResult<true>;
}) satisfies PageLoad;
