import { Locator } from "playwright/test";
import { SalesPortalPage } from "../SalesPortalPage.page";
import { SALES_PORTAL_URL } from "config/env";
import {
  IProduct,
  IProductInTable,
} from "test-data/consts/salesPortal/data/product/Product.type";
import { MANUFACTURERS } from "test-data/consts/salesPortal/data/product/Manufacturers";

export class ProductsPage extends SalesPortalPage {
  protected readonly pageHeader = this.page.locator("h2.fw-bold");
  protected readonly addProductButton = this.page.locator(
    "a[name='add-button']"
  );
  protected readonly productsTable = this.page.locator("#table-products");
  protected readonly getRowByName = (productName: string) =>
    this.productsTable
      .locator("tr", {
        has: this.page.locator("td", { hasText: productName }),
      })
      .locator("td");
  protected uniqueElement: Locator = this.pageHeader;

  public async getProductByName(productName: string): Promise<IProductInTable> {
    const [name, price, manufacturer, createdOn] =
      await this.getRowByName(productName).allInnerTexts();
    return {
      name: name!,
      manufacturer: manufacturer! as MANUFACTURERS,
      price: Number.parseInt(price!.replace("$", "")),
      createdOn: createdOn!,
    };
  }

  public async getProductByRow(rowNumber: number): Promise<IProductInTable> {
    const row = this.productsTable.locator("tr").nth(rowNumber);
    const [name, price, manufacturer, createdOn] = await row
      .locator("td")
      .allInnerTexts();
    return {
      name: name!,
      manufacturer: manufacturer! as MANUFACTURERS,
      price: Number.parseInt(price!.replace("$", "")),
      createdOn: createdOn!,
    };
  }

  public async clickOnAddProductButton() {
    await this.addProductButton.click();
  }

  public async open() {
    await this.page.goto(`${SALES_PORTAL_URL}/#/products`);
  }
}
