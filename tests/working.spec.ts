import { expect } from "@playwright/test";
import { test } from "./test.js";

/* Smoke tests to make sure the pages don't error at least. */

test("home page", async ({ page }) => {
    await page.goto("/");
    await expect(await page.getByText("Newest Set").count()).toBeGreaterThan(0);
});

test("list page", async ({ page }) => {
    await page.goto("/list");
    await expect(await page.getByText("Card Packs").count()).toBeGreaterThan(0);
});

test("set page", async ({ page }) => {
    await page.goto("/set/LL01");
    await expect(await page.getByText("Volume 1").count()).toBeGreaterThan(0);
});

test("member card page", async ({ page }) => {
    await page.goto("/card/LL14-059");
    await expect(await page.getByText("LL14-059").count()).toBeGreaterThan(0);
});

test("song card page", async ({ page }) => {
    await page.goto("/card/LL14-067");
    await expect(await page.getByText("LL14-067").count()).toBeGreaterThan(0);
});

test("memory card page", async ({ page }) => {
    await page.goto("/card/LL14-070");
    await expect(await page.getByText("LL14-070").count()).toBeGreaterThan(0);
});

test("faq page", async ({ page }) => {
    await page.goto("/faq");
    await expect(await page.getByText("How To Play").count()).toBeGreaterThan(0);
});

test("faq rules page", async ({ page }) => {
    await page.goto("/faq/rules");
    await expect(await page.getByText("Rules").count()).toBeGreaterThan(0);
});

test("faq general page", async ({ page }) => {
    await page.goto("/faq/general");
    await expect(await page.getByText("Frequently Asked Questions").count()).toBeGreaterThan(0);
});

test("faq set page", async ({ page }) => {
    await page.goto("/faq/LL01");
    await expect(await page.getByText("LL01 Frequently Asked Questions").count()).toBeGreaterThan(0);
});

test("search page", async ({ page }) => {
    await page.goto("/search");
    await expect(await page.getByText("Search").count()).toBeGreaterThan(0);
});

test("search result page", async ({ page }) => {
    await page.goto("/search/muse/memory/set:LL13");
    await expect(await page.getByText("Search Results").count()).toBeGreaterThan(0);
});

test("labels page", async ({ page }) => {
    await page.goto("/labels");
    await expect(await page.getByText("Label Printer").count()).toBeGreaterThan(0);
});

test("labels result page", async ({ page, context }) => {
    await page.goto("/labels");
    await page.selectOption("select", "DIN A4");
    await page.fill("textarea", "LL01-001");

    const pagePromise = context.waitForEvent("page");
    await (await page.$("button:text('Print')"))?.click();
    const newPage = await pagePromise;
    await expect(await newPage.getByText("1 label ready to print!").count()).toBeGreaterThan(0);
});

test("about page", async ({ page }) => {
    await page.goto("/about");
    await expect(await page.getByText("About").count()).toBeGreaterThan(0);
});
