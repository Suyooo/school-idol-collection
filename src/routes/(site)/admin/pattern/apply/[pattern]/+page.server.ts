import { error } from "@sveltejs/kit";
import { getApplicableSkills } from "$lib/translation/skills.js";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = (async ({ params, locals }) => {
    const pattern = await locals.DB.TranslationPattern.findByPk(parseInt(params.pattern));
    if (pattern === null) {
        throw error(404, { message: "This pattern does not exist." });
    }

    return { id: pattern.id, applicable: await getApplicableSkills(locals.DB, pattern) };
}) satisfies PageServerLoad;
