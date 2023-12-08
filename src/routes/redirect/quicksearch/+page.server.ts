import { redirect } from "@sveltejs/kit";
import { getUrlForQuicksearchQuery } from "$lib/search/quicksearch.js";
import type { Actions } from "./$types.js";

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		global.fetch = fetch;
		const url = await getUrlForQuicksearchQuery(data.get("query") as string);
		throw redirect(303, url);
	},
} satisfies Actions;
