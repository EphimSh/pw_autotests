import { expect, Locator, Page } from "playwright/test";
import { BasePage } from "./BasePage.page";
import { SALES_PORTAL_URL } from "config/env";

export abstract class SalesPortalPage extends BasePage {
  protected readonly spinner = this.page.locator(".spinner-border");
  public readonly notification = this.page.locator(".toast-body");
  protected abstract readonly uniqueElement: Locator;

  async waitForOpened() {
    await expect(this.uniqueElement).toBeVisible();
    await this.waitForSpinners();
  }

  async waitForSpinners() {
    await expect(this.spinner).toHaveCount(0);
  }

  async open() {
    await this.page.goto(SALES_PORTAL_URL);
  }

  async closeNotification() {
    await this.notification.locator("xpath=/following-sibling::button").click();
  }
}
