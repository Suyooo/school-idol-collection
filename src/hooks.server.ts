import type { Handle } from '@sveltejs/kit';
import db from "$models/db";

export const handle: Handle = (async ({ event, resolve }) => {
    await db.syncPromise;
    event.locals.db = db;
    return resolve(event);
});