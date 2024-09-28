// @ts-ignore
import { type Page, PlaywrightTestArgs, PlaywrightTestOptions, test as base } from "@playwright/test";

export const test = base.extend<{}>({
	page: async (
		{ page, javaScriptEnabled }: PlaywrightTestArgs & PlaywrightTestOptions,
		use: (r: Page) => Promise<void>
	) => {
		const goto = page.goto;

		page.goto = async function (url: string, opts: Parameters<typeof goto>[1]) {
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
