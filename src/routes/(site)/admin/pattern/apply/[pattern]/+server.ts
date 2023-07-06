import { error, json } from "@sveltejs/kit";
import { applyPatternToSkills } from "$lib/translation/skills.js";
import type { RequestHandler } from "./$types.js";

export const POST: RequestHandler = (async ({ params, locals, request }) => {
    const DB = await locals.DB;
    const pattern = await DB.m.TranslationPattern.findByPk(params.pattern);
    if (pattern === null) {
        throw error(404, { message: "This pattern does not exist." });
    }

    await applyPatternToSkills(DB, pattern, await request.json());
    return json({ success: true });
}) satisfies RequestHandler;
