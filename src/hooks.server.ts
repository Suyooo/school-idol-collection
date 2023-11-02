import DB from "$models/db.js";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.DB = DB;
    return resolve(event);
};
