import type { Handle } from '@sveltejs/kit';
import DB from "$models/db.js";

export const handle: Handle = (async ({ event, resolve }) => {
    await DB.syncPromise;
    event.locals.db = DB;
    return resolve(event);
});