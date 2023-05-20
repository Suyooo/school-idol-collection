import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	moduleExtensions: [".js", ".mjs", ".cjs", ".ts"],
	kit: {
		adapter: adapter(),
		alias: {
			"$lib": "src/lib",
			"$models": "src/models",
		}
	}
};

export default config;
