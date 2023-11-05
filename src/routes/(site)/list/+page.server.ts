import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = (async ({ fetch }) => {
	const res = await fetch("/json/sets");
	if (!res.ok) {
		throw error(res.status, await res.json());
	}

	return { categories: await res.json() };
}) satisfies PageServerLoad;
