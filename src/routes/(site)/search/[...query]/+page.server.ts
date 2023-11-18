import { error } from "@sveltejs/kit";
import type CardSearchResult from "$lib/types/cardSearchResult.js";
import { addPreparse } from "$lib/types/cardSearchResult.js";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = (async ({ fetch, params }) => {
	const res = await fetch(`/json/search/${params.query}`);
	if (!res.ok) {
		const json = await res.json();
		if (json) {
			return { error: json.message };
		} else {
			throw error(res.status, res.statusText);
		}
	}

	return addPreparse(await res.json()) as CardSearchResult<true>;
}) satisfies PageServerLoad;
