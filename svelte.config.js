import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			"$errors": "src/modules/errors",
			"$lib": "src/lib",
			"$models": "src/models",
			"$style": "src/style",
			"$translation": "src/modules/translation",
			"$types": "src/modules/types",
			"$utils": "src/modules/utils"
		}
	}
};

export default config;
