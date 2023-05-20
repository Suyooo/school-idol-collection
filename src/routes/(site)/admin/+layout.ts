import { error } from "@sveltejs/kit";

export const prerender = !import.meta.env.DEV;

if (!import.meta.env.DEV) {
    throw error(404, { message: "Database editing is only available when running in dev mode" });
}
