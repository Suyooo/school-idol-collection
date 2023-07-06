import { json } from "@sveltejs/kit";
import type SetCategory from "$models/set/category.js";
import type { RequestHandler } from "./$types.js";

export const GET: RequestHandler = (async ({ locals }) => {
    const DB = await locals.DB;
    const categories = await DB.m.SetCategory.findAll({
        include: { model: DB.m.Set, order: ["order"], separate: true },
    });
    return json(categories.map((c: SetCategory) => c.get({ plain: true })));
}) satisfies RequestHandler;
