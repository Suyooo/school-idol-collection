import {sveltekit} from '@sveltejs/kit/vite';
import {defineConfig} from "vite";

export default defineConfig(({command}) => {
    const indev = command !== "build";
    return {
        plugins: [sveltekit()],
        define: {
            INDEV: indev
        }
    };
});