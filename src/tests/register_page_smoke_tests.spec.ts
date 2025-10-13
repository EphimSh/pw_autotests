import test, { expect } from "@playwright/test";
import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from "test-data/consts/notifications/Notifications";
import { testPerson } from "test-data/consts/Person";
import { URL } from "test-data/consts/url/Url";

test.describe("[SMOKE]", () => {
  test.describe("[REGISTER-FORM]", () => {
    test(`При клике на кнопку Register заголовок формы меняется на Registration`, async ({
      page,
    }) => {
      const registerFormHeader = page.locator("h2#registerForm");
      await page.goto(`${URL.BASE_URL}/demo-login-form/`);
      const switchToRegisterButton = page.locator(".button#registerOnLogin");

      await switchToRegisterButton.click();

      await expect(registerFormHeader).toHaveText("Registration");
    });

    test(`При регистрации только с введеным значением login появляется сообщение об ошибке 
    ${ERROR_MESSAGE.PASSWORD_REQUIRED}`, async ({ page }) => {
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

    test(`При регистрации с валидными данными появляется сообщение -  
        ${SUCCESS_MESSAGE.REGISTER_SUCCESS}`, async ({ page }) => {
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
    test(`При успешной авторизации появляется сообщение - ${SUCCESS_MESSAGE.LOGIN_SUCCESS} ${testPerson.firstName}!`, async ({
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
