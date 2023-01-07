// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
import SetCategory from "$models/set/category";
import type {ModelCtor} from "sequelize-typescript";

declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            db: {
                Set: ModelCtor<Set>,
                SetCategory: ModelCtor<SetCategory>
            }
        }

        // interface PageData {}
        // interface Platform {}
    }
}