import { expect } from "@playwright/test";
import { test } from "./test.js";

function textInputTest(label: string, inputs: string[]) {
	test(label, async ({ page }) => {
		for (const input of inputs) {
			await test.step("Input: " + input, async () => {
				const elPre = await page.locator(`b:has-text("${label}") + input`);
				await elPre.fill(input);
				await (await page.$(`button:text-is("Search")`))!.click();

				await page.waitForSelector(`body.ready`, { timeout: 5000 });
				await (await page.$(`button:has-text("Change Search Query")`))!.click();
				const elPost = await page.locator(`:has-text("${label}") + input`);
				await expect(await elPost.inputValue()).toBe(input);
				await expect(await page.locator(".grid-item").count()).toBeGreaterThan(0);
			});
		}
	});
}

function selectTest(label: string) {
	test(label, async ({ page }) => {
		const options = await Promise.all(
			(await (await page.locator(`b:has-text("${label}") + select > option`)).all()).map((opt) =>
				opt.getAttribute("value")
			)
		);

		for (let index = 1; index < options.length; index++) {
			await test.step("Option: " + options[index], async () => {
				const elPre = await page.locator(`b:has-text("${label}") + select`);
				await elPre.selectOption({ index });
				await (await page.$(`button:text-is("Search")`))!.click();

				await page.waitForSelector(`body.ready`, { timeout: 5000 });
				await (await page.$(`button:has-text("Change Search Query")`))!.click();
				const elPost = await page.locator(`:has-text("${label}") + select`);
				expect(await elPost.inputValue()).toBe(options[index]);
				await expect(await page.locator(".grid-item").count()).toBeGreaterThan(0);
			});
		}
	});
}

function numberTest(label: string, numOffset: number = 0) {
	test(label, async ({ page }) => {
		for (let index = 0; index < 3; index++) {
			const number = index + numOffset;
			const expectedMod = index === 0 ? "" : index === 1 ? "<" : ">";
			await test.step("Input: " + expectedMod + index, async () => {
				const elPre = await page.locator(`b:has-text("${label}") + div > input`);
				await elPre.fill(number.toString());
				const elModPre = await page.locator(`b:has-text("${label}") + div > select`);
				await elModPre.selectOption({ index });
				await (await page.$(`button:text-is("Search")`))!.click();

				await page.waitForSelector(`body.ready`, { timeout: 5000 });
				await (await page.$(`button:has-text("Change Search Query")`))!.click();
				const elPost = await page.locator(`:has-text("${label}") + div > input`);
				expect(await elPost.inputValue()).toBe(number.toString());
				const elModPost = await page.locator(`:has-text("${label}") + div > select`);
				expect(await elModPost.inputValue()).toBe(expectedMod);
				await expect(await page.locator(".grid-item").count()).toBeGreaterThan(0);
			});
		}
	});
}

test.describe("UI Options", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/search");
	});

	textInputTest("Card Name", ["halation", "/", "?"]);
	selectTest("Group");
	selectTest("Card Type");
	textInputTest("Card Set", ["LL01", "PR"]);
	textInputTest("Skill Text", ["changes to", "/", "?"]);

	test.describe("Member-only Options", () => {
		test.beforeEach(async ({ page }) => {
			await page.selectOption(`:text-is("Card Type") + select`, "member");
			await page.waitForSelector(`:text-is("Rarity")`);
		});

		selectTest("Rarity");
		selectTest("School Year");
		numberTest("Cost");
		selectTest("Ability");
		textInputTest("Costume", ["halation", ".", "?"]);
		numberTest("Total Pieces");
		numberTest("[SMILE] Pieces");
		numberTest("[PURE] Pieces");
		numberTest("[COOL] Pieces");
		numberTest("[ALL] Pieces");
		selectTest("Birthday Bonus");
		selectTest("Idolizable");
	});

	test.describe("Song-only Options", () => {
		test.beforeEach(async ({ page }) => {
			await page.selectOption(`:text-is("Card Type") + select`, "song");
			await page.waitForSelector(`:text-is("Rarity")`);
		});

		selectTest("Rarity");
		selectTest("Attribute");
		numberTest("Base Live Points");
		selectTest("Requirement");

		test.describe("Any-only Options", () => {
			test.beforeEach(async ({ page }) => {
				await page.selectOption(`:text("Requirement") + select`, "Any Piece Requirement");
				await page.waitForSelector(`:text("Required Pieces")`);
			});

			numberTest("Required Pieces", 4);
		});

		test.describe("Attr-only Options", () => {
			test.beforeEach(async ({ page }) => {
				await page.selectOption(`:text("Requirement") + select`, "Attribute Piece Requirement");
				await page.waitForSelector(`:text("Required [SMILE] Pieces")`);
			});

			numberTest("Required [SMILE] Pieces", 4);
			numberTest("Required [PURE] Pieces", 4);
			numberTest("Required [COOL] Pieces", 4);
		});
	});
});

test("Pagination", async ({ page }) => {
	await page.goto("/search?member");
	await test.step("Go to Page 2", async () => {
		await (await page.$(`a[aria-label="Next Page"]`))!.click();
		await page.waitForSelector(`body.ready`, { timeout: 5000 });
	});
	await test.step("Go to Page 3", async () => {
		await (await page.$(`a[aria-label="Next Page"]`))!.click();
		await page.waitForSelector(`body.ready`, { timeout: 5000 });
	});
	await test.step("Back to Page 2", async () => {
		await (await page.$(`a[aria-label="Previous Page"]`))!.click();
		await page.waitForSelector(`body.ready`, { timeout: 5000 });
	});
	await test.step("Back to Page 1", async () => {
		await (await page.$(`a[aria-label="Previous Page"]`))!.click();
		await page.waitForSelector(`body.ready`, { timeout: 5000 });
		await expect(await page.$(`a[aria-label="Previous Page"]`)).toBeNull();
	});
});
