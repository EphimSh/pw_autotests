import test, { expect } from "@playwright/test";
import {
  negative_register_credentials_data,
  negative_login_data,
} from "test-data/consts/demo-login-form/negative-test-login-data";
import { DemoLoginPage } from "./ui/page/DemoLoginPage.page";

test.describe("[DDT-PRACTICE] [DEMO-LOGIN-FORM] [WITH INVALID CREDENTIALS]", async () => {
  negative_register_credentials_data.forEach(
    ({ username, password, message }) => {
      test(`Error message text '${message}' when register with username: '${username}' and password: '${password}'`, async ({
        page,
      }) => {
        const demoLoginPage = new DemoLoginPage(page);
        await demoLoginPage.open();
        await demoLoginPage.clickOnSwitchToRegisterButton();
        await demoLoginPage.fillRegisterForm({
          username: username,
          password: password,
        });

        await demoLoginPage.clickOnRegisterButton();

        await expect(demoLoginPage.errorMessageOnRegister).toContainText(
          message
        );
      });
    }
  );
});

test.describe("[DDT-PRACTICE] [DEMO-LOGIN-FORM] [LOGIN WITH INVALID CREDENTIALS]", async () => {
  negative_login_data.forEach(({ username, password, message }) => {
    test(`Error message text '${message}' when login with username: '${username}' and password: '${password}'`, async ({
      page,
    }) => {
      const demoLoginPage = new DemoLoginPage(page);
      await demoLoginPage.open();
      await demoLoginPage.fillLoginForm({
        username: username,
        password: password,
      });

      await demoLoginPage.clickOnSubmitButton();

      await expect(demoLoginPage.errorMessageOnLogin).toContainText(message);
    });
  });
});
