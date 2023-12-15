import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";
import tailwindNested from "tailwindcss/nesting/index.js";
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindConfig from "./tailwind.config.js";

export default defineConfig(() => {
	return {
		plugins: [sveltekit()],
		css: {
			postcss: {
				plugins: [tailwindNested, tailwind(tailwindConfig), autoprefixer],
			},
		},
		define: {
			__SIC_TEST_SEARCH_USE_DUMMY_DB__: process.env.SIC_TEST_SEARCH_USE_DUMMY_DB,
		},
	};
});
