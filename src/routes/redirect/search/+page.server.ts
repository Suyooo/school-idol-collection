import { redirect } from "@sveltejs/kit";
import { formDataToQueryMap, queryMapToUrl } from "$lib/search/querymap.js";
import type { Actions } from "./$types.js";

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const url = queryMapToUrl(formDataToQueryMap(data));
		throw redirect(303, `/search/${url}`);
	},
} satisfies Actions;
