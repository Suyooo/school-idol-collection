import { error } from "@sveltejs/kit";
import { getApplicableSkills } from "$lib/translation/skills.js";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = (async ({ params, locals }) => {
	const DB = await locals.DB;
	const pattern = await DB.m.TranslationPattern.findByPk(parseInt(params.pattern));
	if (pattern === null) {
		throw error(404, { message: "This pattern does not exist." });
	}

	return { pattern: pattern.get({ plain: true }), applicable: await getApplicableSkills(DB, pattern) };
}) satisfies PageServerLoad;
