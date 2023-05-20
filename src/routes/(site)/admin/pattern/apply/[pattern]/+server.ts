import { error, json } from "@sveltejs/kit";
import { applyPatternToSkills } from "$lib/translation/skills.js";
import type { RequestHandler } from "./$types.js";

export const POST: RequestHandler = (async ({ params, locals, request }) => {
    const pattern = await locals.DB.TranslationPattern.findByPk(params.pattern);
    if (pattern === null) {
        throw error(404, { message: "This pattern does not exist." });
    }

    await applyPatternToSkills(locals.DB, pattern, await request.json());
    return json({ success: true });
}) satisfies RequestHandler;
