import { test as base } from "@playwright/test";

export const test = base.extend({
	page: async ({ page, javaScriptEnabled }, use) => {
		const goto = page.goto;

		page.goto = async function (url, opts) {
			const res = await goto.call(page, url, opts);

			if (javaScriptEnabled) {
				await page.waitForSelector("body.ready", {
					timeout: 20000,
				});
			}

			return res;
		};

		await use(page);
	},
});
