// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
import type {DBObject} from "$models/db";

declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            db: DBObject
        }

        // interface PageData {}
        // interface Platform {}
    }
}