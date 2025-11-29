import { Locator } from "playwright/test";
import { SalesPortalPage } from "./SalesPortalPage.page";
import { ICredentials } from "consts/salesPortal/data/types/credentials/Credential.type";

export class SignInPage extends SalesPortalPage {
  uniqueElement: Locator = this.page.locator("form", {
    has: this.page.locator("p .lead", { hasText: "Sign in with" }),
  });
  readonly loginForm = this.page.locator("form");
  readonly emailInput = this.loginForm.locator("input#emailinput");
  readonly passwordInput = this.loginForm.locator("input#passwordinput");
  readonly rememberMeCheckbox = this.loginForm.locator(
    "input#remembermecheckbox"
  );
  readonly loginButton = this.loginForm.locator("button", { hasText: "Login" });

  async fillForm(credentials: Partial<ICredentials>) {
    if (credentials.username) await this.emailInput.fill(credentials.username);
    if (credentials.password)
      await this.passwordInput.fill(credentials.password);
  }

  async clickOnRememberMe() {
    await this.rememberMeCheckbox.check();
  }

  async clickOnLoginButton() {
    await this.loginButton.click();
  }
}
