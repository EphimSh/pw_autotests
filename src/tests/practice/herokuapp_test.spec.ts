import test, { expect, Page } from "@playwright/test";
import { URL } from "../../test-data/consts/url/Url";
import {
  IHerokuTablesUser,
  usersData,
} from "test-data/consts/heroku-data-tables/HerokuTablesUser";

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

test.describe("[HEROKU] [TABLES]", async () => {
  usersData.forEach((user) => {
    test(`Check table-row data with user email: ${user.email}`, async ({
      page,
    }) => {
      await page.goto(`${URL.HEROKU_APP_BASE_URL}tables`, {
        waitUntil: "domcontentloaded",
      });

      const tableRow = await getTableRow(page, user.email);
      expect(tableRow).toEqual(user);
    });
  });

  async function getTableRow(
    page: Page,
    email: string
  ): Promise<IHerokuTablesUser> {
    const [lastname, firstname, _email, due, website] = await page
      .locator("#table2 tbody tr", {
        has: page.locator("td", { hasText: email }),
      })
      .locator("td")
      .allInnerTexts();
    return {
      lastName: lastname!,
      firstName: firstname!,
      email: _email!,
      due: due!,
      website: website!,
    };
  }
});
