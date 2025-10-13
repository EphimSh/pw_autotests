import test, { expect } from "@playwright/test";
import { URL } from "../test-data/consts/url/Url";
import { testPerson } from "test-data/consts/Person";
import { SUCCESS_MESSAGE } from "test-data/consts/notifications/Notifications";

test.describe("[DEMO-LOGIN-FORM] [LOCALSTORAGE-MANIPULATION]", () => {
  test("State-drop", async ({ page }) => {
    const usernameInput = page.locator("input#userName");
    const passwordInput = page.locator("input#password");
    const submitButton = page.locator(".button#submit");
    const message = page.locator("#successMessage");
    const testdata = {
      email: "test@gmail.com",
      password: "SecretPw123!@#",
    };
    await page.goto(`${URL.DEMO_LOGIN_BASE_URL}/demo-login-form/`);
    await page.evaluate((testdata) => {
      localStorage.setItem(
        testdata.email,
        JSON.stringify({ name: testdata.email, password: testdata.password })
      );
    }, testdata);
    await usernameInput.fill(testdata.email);
    await passwordInput.fill(testdata.password);
    await submitButton.click();
    await expect(message).toHaveText(
      `${SUCCESS_MESSAGE.LOGIN_SUCCESS}${testdata.email}!`
    );
  });
});
