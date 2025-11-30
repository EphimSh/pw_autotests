import { expect } from "@playwright/test";
import { SalesPortalPage } from "./SalesPortalPage.page";

export abstract class BaseModal extends SalesPortalPage {
  async waitForClosed() {
    await expect(this.uniqueElement).not.toBeVisible({ timeout: 10000 });
  }
}
