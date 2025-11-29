import test, { expect } from "@playwright/test";
import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from "consts/demo-login-form/notifications/Notifications";
import { testPerson } from "consts/heroku-data-tables/Person";
import { URL } from "consts/url/Url";

test.describe("[SMOKE]", () => {
  test.describe("[REGISTER-FORM]", () => {
    test(`Registration form header switches its text when click on Register button`, async ({
      page,
    }) => {
      const registerFormHeader = page.locator("h2#registerForm");
      await page.goto(`${URL.BASE_URL}/demo-login-form/`);
      const switchToRegisterButton = page.locator(".button#registerOnLogin");

      await switchToRegisterButton.click();

      await expect(registerFormHeader).toHaveText("Registration");
    });

    test(`Error message appears '${ERROR_MESSAGE.PASSWORD_REQUIRED}' when register without password`, async ({
      page,
    }) => {
      const errorMessage = page.locator("#errorMessageOnRegister");
      const userNameInput = page.locator("#userNameOnRegister");
      const switchToRegisterButton = page.locator(".button#registerOnLogin");
      const registerButton = page.locator(".button#register");
      await page.goto(`${URL.BASE_URL}/demo-login-form/`);
      await switchToRegisterButton.click();
      await userNameInput.fill(testPerson.firstName);

      await registerButton.click();

      await expect(errorMessage).toHaveText(ERROR_MESSAGE.PASSWORD_REQUIRED);
    });

    test(`Success message appears '${SUCCESS_MESSAGE.REGISTER_SUCCESS}' when register with valid data`, async ({
      page,
    }) => {
      const errorMessage = page.locator("#errorMessageOnRegister");
      const userNameInput = page.locator("#userNameOnRegister");
      const userPasswordInput = page.locator("#passwordOnRegister");
      const switchToRegisterButton = page.locator(".button#registerOnLogin");
      const registerButton = page.locator(".button#register");
      await page.goto(`${URL.BASE_URL}/demo-login-form/`);
      await switchToRegisterButton.click();
      await userNameInput.fill(testPerson.firstName);
      await userPasswordInput.fill(testPerson.password);

      await registerButton.click();

      await expect(errorMessage).toHaveText(SUCCESS_MESSAGE.REGISTER_SUCCESS);
    });
  });
  test.describe("[LOGIN-FORM]", () => {
    test(`Success message appears '${SUCCESS_MESSAGE.LOGIN_SUCCESS} ${testPerson.firstName}!' when login with valid data`, async ({
      page,
    }) => {
      const backButton = await page.locator(".button#backOnRegister");
      const successMessage = page.locator("#errorMessageOnRegister");
      const userNameRegisterInput = page.locator("#userNameOnRegister");
      const userPasswordRegisterInput = page.locator("#passwordOnRegister");
      const switchToRegisterButton = page.locator(".button#registerOnLogin");
      const registerButton = page.locator(".button#register");
      const submitButton = page.locator("#submit.button");
      const usernameInput = page.locator("input#userName");
      const passwordInput = page.locator("input#password");
      const authorizationSuccesMessage = page.locator("h4#successMessage");

      await page.goto(`${URL.BASE_URL}/demo-login-form/`);
      await switchToRegisterButton.click();
      await userNameRegisterInput.fill(testPerson.firstName);
      await userPasswordRegisterInput.fill(testPerson.password);
      await registerButton.click();
      await expect(successMessage).toHaveText(SUCCESS_MESSAGE.REGISTER_SUCCESS);
      await backButton.click();

      await usernameInput.fill(testPerson.firstName);
      await passwordInput.fill(testPerson.password);
      await submitButton.click();

      await expect(authorizationSuccesMessage).toHaveText(
        SUCCESS_MESSAGE.LOGIN_SUCCESS + `${testPerson.firstName}` + `!`
      );
    });
  });
});
