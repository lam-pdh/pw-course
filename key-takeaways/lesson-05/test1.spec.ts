import { test } from "@playwright/test";

test("Register page", async ({ page }) => {
  await page.goto("https://material.playwrightvn.com/");
  await page.click('//*[@id="section-xpath"]/table/tbody/tr[1]/td[2]/a');
  await page.locator('//*[@id="username"]').fill("lam.phan");
  await page.locator('//*[@id="email"]').fill("lam.phan@playwrightvn.com");
  await page.locator('//*[@id="male"]').check();
  await page.locator('//*[@id="traveling"]').check();
  await page
    .locator('//*[@id="interests"]')
    .selectOption({ label: "Technology" });
  await page.locator('//*[@id="country"]').selectOption({ label: "Canada" });
  await page.locator('//*[@id="dob"]').pressSequentially("09/19/1997");
  await page
    .locator('//*[@id="profile"]')
    .setInputFiles("C:/Users/lam.phan/Desktop/HK_00021.jpg");
  await page
    .locator('//*[@id="bio"]')
    .fill(
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    );
  await page.locator('//*[@id="rating"]').fill("10");
  await page.locator('//*[@id="favcolor"]').fill("#000000");
  await page.locator('//*[@id="registrationForm"]/div[12]/div/div').hover();
  await page.locator('//*[@id="newsletter"]').check();
  await page
    .locator('//*[@id="registrationForm"]/div[13]/label[2]/span')
    .check();
  await page.locator('//*[@id="starRating"]').click();
  await page.locator('//*[@id="customDate"]').pressSequentially("09/19/2025");
  await page.locator('//*[@id="registrationForm"]/div[16]/button').click();
});
