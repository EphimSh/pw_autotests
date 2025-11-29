import { test as base, expect } from "@playwright/test";
import { HomePage } from "salesPortal/ui/pages/HomePage.page";
import { SignInPage } from "salesPortal/ui/pages/SignIn.page";
import { ProductModalPage } from "salesPortal/ui/pages/product/AddProductModal.page";
import { ProductsPage } from "salesPortal/ui/pages/product/ProductsPage.page";

export interface IPages {
  productsPage: ProductsPage;
  addProductPage: ProductModalPage;
  homePage: HomePage;
  signInPage: SignInPage;
}

export const test = base.extend<IPages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  addProductPage: async ({ page }, use) => {
    await use(new ProductModalPage(page));
  },
});

export { expect };
