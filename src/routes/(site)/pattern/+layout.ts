import {error} from "@sveltejs/kit";

export const prerender = false;

if (!import.meta.env.DEV) {
    throw error(404, {message: "Database editing is only available when running in dev mode"});
}