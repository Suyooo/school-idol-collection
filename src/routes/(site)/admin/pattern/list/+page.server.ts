import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = (async ({ locals }) => {
    return { list: (await (await locals.DB).models.TranslationPattern.findAll()).map((p) => p.get({ plain: true })) };
}) satisfies PageServerLoad;
