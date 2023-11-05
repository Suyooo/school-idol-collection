import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: 2,
	workers: process.env.CI ? 1 : undefined,
	use: {
		baseURL: "http://127.0.0.1:5173",
		trace: "off",
	},

	projects: [
		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},
	],

	webServer: {
		command: "npm run dev",
		url: "http://127.0.0.1:5173",
		reuseExistingServer: !process.env.CI,
	},
});
