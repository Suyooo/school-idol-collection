import { listUntranslatedSkills } from "$lib/translation/skills.js";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = (async ({ locals }) => {
    return { untranslated: await listUntranslatedSkills(locals.DB) };
}) satisfies PageServerLoad;
