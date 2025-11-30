import { Page } from "@playwright/test";
import { HomePage, HomeModuleButton } from "salesPortal/ui/pages/HomePage.page";
import { ProductsPage } from "salesPortal/ui/pages/product/ProductsPage.page";

export class HomeUIService {
  homePage: HomePage;
  productsPage: ProductsPage;
  constructor(private page: Page) {
    this.homePage = new HomePage(page);
    this.productsPage = new ProductsPage(page);
  }

  async openModule(moduleName: HomeModuleButton) {
    await this.homePage.clickOnViewModule(moduleName);
    if (moduleName === "Products") {
      await this.productsPage.waitForOpened();
    }
  }
}
