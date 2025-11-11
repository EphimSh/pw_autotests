import { credentials } from "config/env";
import { expect, test } from "fixtures/pages.fixture";
import { SUCCESS_MESSAGES } from "test-data/consts/salesPortal/data/notifications/Notifications";
import { generateProductData } from "test-data/consts/salesPortal/data/product/ProductDataGenerator";
import _ from "lodash";

test.describe("[E2E][Sales Portal]", () => {
  test("Added product should be in products list", async ({
    signInPage,
    homePage,
    productsPage,
    addProductPage,
  }) => {
    await signInPage.open();
    await signInPage.fillForm(credentials);
    await signInPage.clickOnLoginButton();
    await homePage.waitForOpened();
    await productsPage.open();
    await productsPage.waitForOpened();
    await productsPage.clickOnAddProductButton();
    await addProductPage.waitForOpened();
    const newProduct = generateProductData();
    await addProductPage.fillForm(newProduct);
    await addProductPage.clickSave();
    await expect(productsPage.notification).toContainText(
      SUCCESS_MESSAGES.PRODUCT_ADDED
    );
    const firstProduct = await productsPage.getProductByRow(1);
    expect(_.omit(newProduct, ["notes", "amount"])).toEqual(
      _.omit(firstProduct, "createdOn")
    );
  });
});
