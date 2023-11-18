import { expect } from "@playwright/test";
import { test } from "./test.js";

function textInputTest(label: string, inputs: string[], expected: number[]) {
	test(label, async ({ page }) => {
		await expect(inputs, "Ensure special characters are tested").toContain("?");
		await expect(inputs, "Ensure special characters are tested").toContain("#");
		await expect(inputs, "Ensure special characters are tested").toContain("/");
		await expect(inputs, "Ensure special characters are tested").toContain("=");

		for (let i = 0; i < inputs.length; i++) {
			await test.step("Input: " + inputs[i], async () => {
				const elPre = await page.locator(`b:has-text("${label}") + input`);
				await elPre.fill(inputs[i]);
				await (await page.$(`button:text-is("Search")`))!.click();

				await page.waitForSelector(`body.ready`, { timeout: 5000 });
				await (await page.$(`button:has-text("Change Search Query")`))!.click();
				const elPost = await page.locator(`:has-text("${label}") + input`);
				await expect(await elPost.inputValue()).toBe(inputs[i]);

				await expect(await page.locator(".grid-item").count()).toBe(expected[i]);
				if (expected[i] === 0) {
					await expect(await page.locator(`.error:has-text("no results")`).count()).toBeGreaterThan(0);
				} else {
					await expect(await page.locator(`.error:has-text("no results")`).count()).toBe(0);
				}
			});
		}
	});
}

function selectTest(label: string, options: string[], expected: number[]) {
	test(label, async ({ page }) => {
		const optionCount = (await page.locator(`b:has-text("${label}") + select > option`).count()) - 1;
		await expect(new Set(options).size, "Ensure every option is tested").toBe(optionCount);

		for (let i = 0; i < options.length; i++) {
			await test.step("Option: " + options[i], async () => {
				const elPre = await page.locator(`b:has-text("${label}") + select`);
				await elPre.selectOption({ index: i + 1 });
				await (await page.$(`button:text-is("Search")`))!.click();

				await page.waitForSelector(`body.ready`, { timeout: 5000 });
				await (await page.$(`button:has-text("Change Search Query")`))!.click();
				const elPost = await page.locator(`:has-text("${label}") + select`);
				expect(await elPost.inputValue()).toBe(options[i]);

				await expect(await page.locator(".grid-item").count()).toBe(expected[i]);
				if (expected[i] === 0) {
					await expect(await page.locator(`.error:has-text("no results")`).count()).toBeGreaterThan(0);
				} else {
					await expect(await page.locator(`.error:has-text("no results")`).count()).toBe(0);
				}
			});
		}
	});
}

function numberTest(label: string, expected: [number, number, number], numOffset: number = 0) {
	test(label, async ({ page }) => {
		for (let i = 0; i < 3; i++) {
			const number = i + numOffset;
			const expectedMod =
				i === 0 ? ""
				: i === 1 ? "-"
				: "+";
			await test.step("Input: " + number + expectedMod, async () => {
				const elPre = await page.locator(`b:has-text("${label}") + div > input`);
				await elPre.fill(number.toString());
				const elModPre = await page.locator(`b:has-text("${label}") + div > select`);
				await elModPre.selectOption({ index: i });
				await (await page.$(`button:text-is("Search")`))!.click();

				await page.waitForSelector(`body.ready`, { timeout: 5000 });
				await (await page.$(`button:has-text("Change Search Query")`))!.click();
				const elPost = await page.locator(`:has-text("${label}") + div > input`);
				expect(await elPost.inputValue()).toBe(number.toString());
				const elModPost = await page.locator(`:has-text("${label}") + div > select`);
				expect(await elModPost.inputValue()).toBe(expectedMod);

				await expect(await page.locator(".grid-item").count()).toBe(expected[i]);
				if (expected[i] === 0) {
					await expect(await page.locator(`.error:has-text("no results")`).count()).toBeGreaterThan(0);
				} else {
					await expect(await page.locator(`.error:has-text("no results")`).count()).toBe(0);
				}
			});
		}
	});
}

// Use secondary test server, which has the search test database loaded
test.use({
	baseURL: "http://127.0.0.1:5175",
});

test.describe("UI Options", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/search");
	});

	textInputTest("Card Name", ["halation", "/", "?", "=", "#"], [1, 2, 1, 0, 0]);
	selectTest(
		"Group",
		["muse", "aqours", "printemps", "lilywhite", "bibi", "cyaron", "azalea", "guiltykiss", "saintsnow"],
		[7, 12, 1, 1, 1, 3, 2, 2, 3]
	);
	selectTest("Card Type", ["member", "song", "memory"], [12, 11, 1]);
	textInputTest("Card Set", ["LL01", "PR", "/", "?", "=", "#"], [1, 2, 0, 0, 0, 0]);
	textInputTest("Skill Text", ["メンバー", "Member", "/", "?", "=", "#"], [12, 14, 1, 1, 0, 0]);

	test.describe("Member-only Options", () => {
		test.beforeEach(async ({ page }) => {
			await page.selectOption(`:text-is("Card Type") + select`, "member");
			await page.waitForSelector(`:text-is("Rarity")`);
		});

		selectTest("Rarity", ["r", "sr", "hr", "special", "secret", "pr", "n", "ssr"], [3, 1, 3, 1, 1, 1, 1, 1]);
		selectTest("School Year", ["year=1", "year=2", "year=3"], [1, 3, 7]);
		numberTest("Cost", [5, 7, 5]);
		selectTest("Ability", ["noability", "rush", "live", "rushorlive"], [8, 3, 2, 1]);
		textInputTest("Costume", ["奇跡", "kiseki", "/", "?", "=", "#"], [1, 1, 0, 1, 0, 0]);
		numberTest("Total Pieces", [1, 5, 7]);
		numberTest("[SMILE] Pieces", [8, 10, 2]);
		numberTest("[PURE] Pieces", [10, 11, 1]);
		numberTest("[COOL] Pieces", [7, 11, 1]);
		numberTest("[ALL] Pieces", [10, 11, 1]);
		selectTest("Birthday Bonus", ["nobonus", "bonus"], [11, 1]);
		selectTest("Idolizable", ["notidolizable", "idolizable"], [11, 1]);
	});

	test.describe("Song-only Options", () => {
		test.beforeEach(async ({ page }) => {
			await page.selectOption(`:text-is("Card Type") + select`, "song");
			await page.waitForSelector(`:text-is("Rarity")`);
		});

		selectTest("Rarity", ["m", "gr"], [10, 1]);
		selectTest("Attribute", ["neutral", "smile", "pure", "cool", "orange"], [4, 2, 3, 1, 1]);
		numberTest("Base Live Points", [1, 4, 7], 1);
		selectTest("Requirement", ["anypiece", "attributepiece"], [3, 8]);

		test.describe("Any-only Options", () => {
			test.beforeEach(async ({ page }) => {
				await page.selectOption(`:text("Requirement") + select`, "Any Piece Requirement");
				await page.waitForSelector(`:text("Required Pieces")`);
			});

			numberTest("Required Pieces", [1, 2, 1], 11);
		});

		test.describe("Attr-only Options", () => {
			test.beforeEach(async ({ page }) => {
				await page.selectOption(`:text("Requirement") + select`, "Attribute Piece Requirement");
				await page.waitForSelector(`:text("Required [SMILE] Pieces")`);
			});

			numberTest("Required [SMILE] Pieces", [2, 6, 2], 2);
			numberTest("Required [PURE] Pieces", [3, 5, 3], 2);
			numberTest("Required [COOL] Pieces", [2, 5, 3], 2);
		});
	});
});

test("Pagination", async ({ page }) => {
	await page.goto("/search/member/pagesize=4");
	await expect(await page.$(`a[aria-label="Previous Page"]`)).toBeNull();
	await test.step("Go to Page 2", async () => {
		await (await page.$(`a[aria-label="Next Page"]`))!.click();
		await page.waitForSelector(`body.ready`, { timeout: 5000 });
	});
	await test.step("Go to Page 3", async () => {
		await (await page.$(`a[aria-label="Next Page"]`))!.click();
		await page.waitForSelector(`body.ready`, { timeout: 5000 });
		await expect(await page.$(`a[aria-label="Next Page"]`)).toBeNull();
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
	await test.step("Jump to Page 3", async () => {
		await (await page.$(`a[aria-label="Page 3"]`))!.click();
		await page.waitForSelector(`body.ready`, { timeout: 5000 });
		await expect(await page.$(`a[aria-label="Next Page"]`)).toBeNull();
	});
	await test.step("Jump to Page 2", async () => {
		await (await page.$(`a[aria-label="Page 2"]`))!.click();
		await page.waitForSelector(`body.ready`, { timeout: 5000 });
	});
	await test.step("Jump to Page 1", async () => {
		await (await page.$(`a[aria-label="Page 1"]`))!.click();
		await page.waitForSelector(`body.ready`, { timeout: 5000 });
		await expect(await page.$(`a[aria-label="Previous Page"]`)).toBeNull();
	});
});
