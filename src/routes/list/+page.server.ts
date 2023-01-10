import type {PageServerLoad} from './$types.js';
import type SetCategory from "$models/set/category.js";

export const load: PageServerLoad = (async ({locals}) => {
    const categories = (await locals.db.SetCategory.findAll({
        include: {model: locals.db.Set, order: ["order"], separate: true}
    }));
    return {categories: categories.map((c: SetCategory) => c.get({plain: true}))};
});