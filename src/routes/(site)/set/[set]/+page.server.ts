import { error } from "@sveltejs/kit";
import type Card from "$models/card/card.js";
import type Set from "$models/set/set.js";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = (async ({ params, fetch }) => {
	const res = await fetch(`/json/set/${params.set}`);
	if (!res.ok) {
		throw error(res.status, await res.json());
	}

	return (await res.json()) as { set: Set; cards: Card[] };
}) satisfies PageServerLoad;
