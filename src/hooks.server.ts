import type { Handle } from "@sveltejs/kit";
import DB from "$models/db.js";

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.DB = DB;
    return resolve(event);
};
