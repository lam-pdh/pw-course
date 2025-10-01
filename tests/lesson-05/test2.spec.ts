import { test } from "@playwright/test";

test("Product page", async ({ page }) => {
  await page.goto("https://material.playwrightvn.com/");
  await page.click('//*[@id="section-xpath"]/table/tbody/tr[2]/td[2]/a');
  await page.locator('body > div.container > div.products > div:nth-child(1) > div > button').click({ clickCount: 2 });
  await page.locator('body > div.container > div.products > div:nth-child(2) > div > button').click({ clickCount: 3 });
  await page.locator('body > div.container > div.products > div:nth-child(3) > div > button').click();
});