import { BasePage } from "./BasePage.page";
import { URL } from "../../../../test-data/consts/url/Url";
import { ICredentials } from "test-data/consts/demo-login-form/negative-test-login-data";

export class DemoLoginPage extends BasePage {
  readonly loginForm = this.page.locator(".loginForm");
  readonly submitButton = this.loginForm.locator("#submit");
  readonly switchToRegisterButton = this.loginForm.locator("#registerOnLogin");
  readonly usernameInput = this.loginForm.locator("#userName");
  readonly passwordInput = this.loginForm.locator("#password");
  readonly errorMessageOnLogin = this.loginForm.locator("#errorMessage");

  readonly registerForm = this.page.locator(".registerForm");
  readonly registerButton = this.registerForm.locator("#register");
  readonly backToLoginButton = this.registerForm.locator("#backOnRegister");
  readonly registerUsernameInput = this.registerForm.locator(
    "#userNameOnRegister"
  );
  readonly registerPasswordInput = this.registerForm.locator(
    "#passwordOnRegister"
  );
  readonly errorMessageOnRegister = this.registerForm.locator(
    "#errorMessageOnRegister"
  );

  async open() {
    await this.page.goto(`${URL.BASE_URL}/demo-login-form/`);
  }

  async clickOnSubmitButton(): Promise<void> {
    await this.submitButton.click();
  }

  async clickOnSwitchToRegisterButton(): Promise<void> {
    await this.switchToRegisterButton.click();
  }

  async clickOnRegisterButton(): Promise<void> {
    await this.registerButton.click();
  }

  async clickOnBackButton(): Promise<void> {
    await this.backToLoginButton.click();
  }

  async fillRegisterForm(userdata: ICredentials) {
    if (userdata.username)
      await this.registerUsernameInput.fill(userdata.username);
    if (userdata.password)
      await this.registerPasswordInput.fill(userdata.password);
  }

  async fillLoginForm(userdata: ICredentials) {
    if (userdata.username)
      await this.usernameInput.fill(userdata.username);
    if (userdata.password)
      await this.passwordInput.fill(userdata.password);
  }
}
