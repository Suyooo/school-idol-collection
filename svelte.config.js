import adapter from '@sveltejs/adapter-node';
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
			"$errors": "src/modules/errors",
			"$lib": "src/lib",
			"$models": "src/models",
			"$search": "src/modules/search",
			"$style": "src/style",
			"$translation": "src/modules/translation",
			"$types": "src/modules/types",
			"$utils": "src/modules/utils"
		}
	}
};

export default config;
