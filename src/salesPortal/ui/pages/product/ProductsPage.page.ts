import { Locator, Request } from "playwright/test";
import { SalesPortalPage } from "../SalesPortalPage.page";
import { SALES_PORTAL_URL } from "config/env";
import {
  IProductInTable,
  ProductsTableHeader,
} from "consts/salesPortal/data/types/product/Product.type";
import { MANUFACTURERS } from "consts/salesPortal/data/product/Manufacturers";
import { DeleteProductModal } from "./DeleteProductModal.page";

export class ProductsPage extends SalesPortalPage {
  protected readonly pageHeader = this.page.locator("h2.fw-bold");
  protected readonly addProductButton = this.page.locator(
    "a[name='add-button']"
  );
  protected readonly productsTable = this.page.locator("#table-products");
  public readonly tableRows = this.productsTable.locator("tbody tr");
  public readonly getRowByName = (productName: string) =>
    this.productsTable.locator("tr", {
      has: this.page.locator("td", { hasText: productName }),
    });
  public readonly getRowByIndex = (index: number) => this.tableRows.nth(index);
  protected readonly tableHeader = this.productsTable.locator("thead th");
  protected readonly tableHeaderNamed = (name: ProductsTableHeader) =>
    this.tableHeader
      .filter({ hasText: name })
      .locator("div[current]");
  public readonly tableHeaderArrow = (
    name: ProductsTableHeader,
    { direction }: { direction: "asc" | "desc" }
  ) =>
    this.tableHeader
      .filter({ hasText: name })
      .locator(`i.${direction === "asc" ? "bi-arrow-down" : "bi-arrow-up"}`);

  public readonly deleteModalWindow = new DeleteProductModal(this.page);
  protected uniqueElement: Locator = this.pageHeader;

  protected readonly detailsButton = (productName: string) =>
    this.getRowByName(productName).locator('button[title="Details"]');

  protected readonly editButton = (productName: string) =>
    this.getRowByName(productName).locator('button[title="Edit"]');

  protected readonly deleteButton = (productName: string) =>
    this.getRowByName(productName).locator('button[title="Delete"]');

  public async clickDetailsButtonByProductName(productName: string) {
    await this.detailsButton(productName).click();
  }

  public async clickEditButtonByProductName(productName: string) {
    await this.editButton(productName).click();
  }

  public async clickDeleteButtonByProductName(productName: string) {
    await this.deleteButton(productName).click();
  }

  public async getProductByName(productName: string): Promise<IProductInTable> {
    const [name, price, manufacturer, createdOn] = await this.getRowByName(
      productName
    )
      .locator("td")
      .allInnerTexts();
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

  public async clickTableHeader(name: ProductsTableHeader) {
    await this.tableHeaderNamed(name).click();
  }

  public async getTableData(): Promise<IProductInTable[]> {
    const data: IProductInTable[] = [];
    const rows = await this.tableRows.all();
    for (const row of rows) {
      const [name, price, manufacturer, createdOn] = await row
        .locator("td")
        .allInnerTexts();
      data.push({
        name: name!,
        manufacturer: manufacturer! as MANUFACTURERS,
        price: Number.parseInt(price!.replace("$", "")),
        createdOn: createdOn!,
      });
    }
    return data;
  }
}
