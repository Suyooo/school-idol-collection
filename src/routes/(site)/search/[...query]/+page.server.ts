import { error } from "@sveltejs/kit";
import type CardSearchResult from "$lib/types/cardSearchResult.js";
import { addPreparse } from "$lib/types/cardSearchResult.js";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = (async ({ fetch, url }) => {
	// Use pathname instead of params.query to keep escaped characters
	const res = await fetch(`/json${url.pathname}`);
	if (!res.ok) {
		const json = await res.json();
		throw error(res.status, json ? json.message : res.statusText);
	}

	return addPreparse(await res.json()) as CardSearchResult<true>;
}) satisfies PageServerLoad;
