import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: 2,
	workers: process.env.CI ? 1 : undefined,
	use: {
		actionTimeout: 10000,
		baseURL: "http://127.0.0.1:5174",
		trace: "off",
	},

	projects: [
		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},
	],

	webServer: [
		{
			command: "npm run dev -- --port 5174",
			url: "http://127.0.0.1:5174",
			reuseExistingServer: false,
		},
		{
			command: "SIC_USE_SEARCH_TEST_DB=1 npm run dev -- --port 5175",
			url: "http://127.0.0.1:5175",
			reuseExistingServer: false,
		},
	],
});
