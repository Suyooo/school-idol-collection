import {sveltekit} from '@sveltejs/kit/vite';
import {defineConfig} from "vite";

const externals = ["pg-hstore"];
export default defineConfig(({command}) => {
    const INDEV = command !== "build";
    return {
        plugins: [sveltekit()],
        define: {INDEV},
        build: {
            rollupOptions: {
                external: externals
            }
        },
        optimizeDeps: {
            exclude: externals
        }
    };
});