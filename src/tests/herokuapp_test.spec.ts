import test, { expect } from "@playwright/test";
import { URL } from "../test-data/consts/url/Url";

test.describe("[HEROKU] [DYNAMIC CONTROLS] [WAITS]", () => {
  test("", async ({ page }) => {
    await test.step("Go to the-internet.herokuapp.com", async () => {
      await page.goto(`${URL.HEROKU_APP_BASE_URL}`);
    });
    const dynamicControlsLink = page.locator('a[href="/dynamic_controls"]');
    const removeButton = page.getByRole("button", { name: "Remove" });
    const checkBox = page.locator('input[type="checkbox"]');
    const pageMainHeader = page.locator(".example h4").first();
    const addButton = page.getByRole("button", { name: "Add" });
    const message = page.locator("#message");

    await dynamicControlsLink.click();
    await expect(removeButton).toBeVisible();
    await expect(pageMainHeader).toHaveText("Dynamic Controls");
    await checkBox.click();
    await removeButton.click();
    await checkBox.waitFor({ state: "hidden" });
    await addButton.waitFor({ state: "visible" });
    await expect(message).toHaveText("It's gone!");
    await addButton.click();
    await expect(checkBox).toBeVisible({ timeout: 5100 });
    await expect(message).toHaveText("It's back!");
  });
});
