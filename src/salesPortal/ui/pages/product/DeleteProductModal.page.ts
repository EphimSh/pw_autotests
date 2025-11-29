import { Locator } from "playwright/test";
import { SalesPortalPage } from "../SalesPortalPage.page";

export class DeleteProductModal extends SalesPortalPage {
  protected readonly modal = this.page.locator(".modal-content");

  protected uniqueElement: Locator = this.modal.locator("h5.modal-title");

  protected readonly deleteButton = this.modal.locator("button.btn-danger");
  protected readonly cancelButton = this.modal.locator("button.btn-secondary");
  protected readonly closeButton = this.modal.locator(".btn-close");

  public async clickDeleteButton() {
    await this.deleteButton.click();
  }

  public async clickCancelButton() {
    await this.cancelButton.click();
  }

  public async clickCloseButton() {
    await this.closeButton.click();
  }
}
