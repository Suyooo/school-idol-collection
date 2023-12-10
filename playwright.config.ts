import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: 2,
	workers: process.env.CI ? 1 : undefined,
	reporter: "list",
	use: {
		actionTimeout: 10000,
		baseURL: process.env.SIC_TEST_OVERRIDE_URL || "http://127.0.0.1:5174",
		trace: "off",
	},

	projects:
		process.env.CI ?
			[
				/* Playwright Docker can't run Firefox and it's labeled wontfix, how fun */
				{
					name: "Webkit JS",
					use: { ...devices["Desktop Edge"], javaScriptEnabled: true },
				},
				{
					name: "Webkit NoScript",
					use: { ...devices["Desktop Edge"], javaScriptEnabled: false },
				},
			]
		:	[
				{
					name: "Firefox JS",
					use: { ...devices["Desktop Firefox"], javaScriptEnabled: true },
				},
				{
					name: "Firefox NoScript",
					use: { ...devices["Desktop Firefox"], javaScriptEnabled: false },
				},
			],

	webServer:
		process.env.SIC_TEST_OVERRIDE_URL ?
			undefined
		:	[
				{
					command: "npm run dev -- --port 5174",
					url: "http://127.0.0.1:5174",
					reuseExistingServer: false,
					timeout: 300 * 1000,
				},
				{
					command: "SIC_TEST_SEARCH_USE_DUMMY_DB=1 npm run dev -- --port 5175",
					url: "http://127.0.0.1:5175",
					reuseExistingServer: false,
					timeout: 300 * 1000,
				},
			],
});
