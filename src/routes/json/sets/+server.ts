import { json } from "@sveltejs/kit";
import type SetCategory from "$models/set/category.js";
import type { RequestHandler } from "./$types.js";

export const GET: RequestHandler = (async ({ locals }) => {
    const categories = await locals.DB.SetCategory.findAll({
        include: { model: locals.DB.Set, order: ["order"], separate: true },
    });
    return json(categories.map((c: SetCategory) => c.get({ plain: true })));
}) satisfies RequestHandler;
