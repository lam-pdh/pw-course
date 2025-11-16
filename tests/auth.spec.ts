import { test, expect } from "@playwright/test";

// Test Data Invalid
const usernameInvalid = "lam.phan";
const passwordInvalid = "lam.phan@pdh";

// Test Data Valid
const usernameValid = "betterbytes.academy.admin";
const passwordValid = "StrongPass@BetterBytesAcademy";

// Test Suite: Authentication
test.describe("AUTH - Authentication", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
  });

  // Test Case - AUTH_001: Login Fail
  test("@AUTH_001: Login Fail", async ({ page }) => {
    // Input username, expect value
    await page.locator('//*[@id="user_login"]').fill(`${usernameInvalid}`);
    await expect(page.locator('//*[@id="user_login"]')).toHaveValue(
      `${usernameInvalid}`
    );

    // Input password, expect value
    await page.locator('//*[@id="user_pass"]').fill(`${passwordInvalid}`);
    await expect(page.locator('//*[@id="user_pass"]')).toHaveValue(
      `${passwordInvalid}`
    );

    // Click Button Login, expect
    await page.locator('//*[@id="wp-submit"]').click();
    await expect(page.locator('//*[@id="login_error"]')).toContainText(
      `The username ${usernameInvalid} is not registered on this site. If you are unsure of your username, try your email address instead.`
    );
  });


    // Test Case - AUTH_002: Login success
  test("@AUTH_002: Login Success", async ({ page }) => {
    // Input username, expect value
    await page.locator('//*[@id="user_login"]').fill(`${usernameValid}`);
    await expect(page.locator('//*[@id="user_login"]')).toHaveValue(`${usernameValid}`);

    // Input password, expect value
    await page.locator('//*[@id="user_pass"]').fill(`${passwordValid}`);
    await expect(page.locator('//*[@id="user_pass"]')).toHaveValue(`${passwordValid}`);

    // Click Button Login, expect
    await page.locator('//*[@id="wp-submit"]').click();
    await expect(page.locator('//*[@id="login_error"]')).toContainText(`The username ${usernameValid} is not registered on this site. If you are unsure of your username, try your email address instead.`);
  });

});
