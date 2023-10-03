import type { Sequelize } from "$m/db.js";
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
import type { DBObject } from "$m/db.js";

declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            DB: Promise<Sequelize>;
        }

        // interface PageData {}
        // interface Platform {}
    }
}
