import { Locator } from "playwright/test";
import { SalesPortalPage } from "../SalesPortalPage.page";
import { IProduct } from "consts/salesPortal/data/types/product/Product.type";

export class ProductModalPage extends SalesPortalPage {
  protected readonly title = this.page.locator("h2.page-title-text");
  protected readonly addNewProductForm = this.page.locator(
    "form#add-new-product-form"
  );
  protected readonly nameInput =
    this.addNewProductForm.locator("input[name='name']");
  protected readonly priceInput = this.addNewProductForm.locator(
    "input[name='price']"
  );
  protected readonly manufacturerSelect = this.addNewProductForm.locator(
    "select#inputManufacturer"
  );
  protected readonly amountInput =
    this.addNewProductForm.locator("input#inputAmount");
  protected readonly notesInput = this.addNewProductForm.locator(
    "textarea#textareaNotes"
  );
  protected readonly saveButton = this.addNewProductForm.locator(
    "button#save-new-product"
  );
  protected readonly clearAllButton = this.addNewProductForm.locator(
    "button#clear-inputs"
  );

  protected uniqueElement: Locator = this.title;

  async fillForm(productData: Partial<IProduct>) {
    if (productData.name) await this.nameInput.fill(productData.name);
    if (productData.manufacturer)
      await this.manufacturerSelect.selectOption(productData.manufacturer);
    if (productData.price)
      await this.priceInput.fill(productData.price.toString());
    if (productData.amount)
      await this.amountInput.fill(productData.amount.toString());
    if (productData.notes) await this.notesInput.fill(productData.notes);
  }

  async clickSave() {
    await this.saveButton.click();
  }
}
