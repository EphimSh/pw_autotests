import test, { expect } from "@playwright/test";
import { testPerson } from "consts/heroku-data-tables/Person";
import { URL } from "consts/url/Url";

test.describe("[SMOKE]", () => {
  test("Введенные значения отображаются в Registration Details", async ({
    page,
  }) => {
    await test.step(`Перейти на страницу ${URL.BASE_URL}/demo-registration-form/`, async () => {
      await page.goto(`${URL.BASE_URL}/demo-registration-form/`);
    });

    const form = page.locator("#registrationForm");
    const firstNameInput = form.locator("input#firstName");
    const lastNameInput = form.locator("input#lastName");
    const addressTextArea = form.locator("textarea#address");
    const emailInput = form.locator("input#email");
    const phoneInput = form.locator("input#phone");
    const countryDropDown = form.locator("select#country");
    const genderOptions = form
      .locator(".form-label", { hasText: "Gender" })
      .locator("..");
    const hobbiesCheckboxes = form
      .locator(".form-label", { hasText: "Hobbies" })
      .locator("..");
    const languageInput = form.locator("input#language");
    const skillsOptions = form.locator("select#skills");
    const birthYearDropDown = form.locator("select#year");
    const monthDropDown = form.locator("select#month");
    const dayDropDown = form.locator("select#day");
    const passwordInput = form.locator("input#password");
    const passwordConfirmationInput = form.locator("input#password-confirm");
    const submitButton = form.locator("button[type='submit']");
    const registrationDetails = page.locator(".card.p-4");
    const fullNameField = registrationDetails.locator("#fullName");
    const addressField = registrationDetails.locator("#address");
    const emailField = registrationDetails.locator("#email");
    const phoneField = registrationDetails.locator("#phone");
    const countryField = registrationDetails.locator("#country");
    const genderField = registrationDetails.locator("#gender");
    const languageField = registrationDetails.locator("#language");
    const skillsField = registrationDetails.locator("#skills");
    const hobbiesField = registrationDetails.locator("#hobbies");
    const dateOfBirth = registrationDetails.locator("#dateOfBirth");
    const passwordField = registrationDetails.locator("#password");

    await test.step("Заполнить форму", async () => {
      await firstNameInput.fill(testPerson.firstName);
      await lastNameInput.fill(testPerson.lastName);
      await addressTextArea.fill(testPerson.address);
      await emailInput.fill(testPerson.email);
      await phoneInput.fill(testPerson.phone);
      await countryDropDown.selectOption(testPerson.country);
      await genderOptions
        .locator(`input[value='${testPerson.gender}']`)
        .click();
      for (const hobby of testPerson.hobbies) {
        await hobbiesCheckboxes.locator(`input[value='${hobby}']`).click();
      }
      await languageInput.fill(testPerson.language);
      await skillsOptions.selectOption(testPerson.skills);
      await birthYearDropDown.selectOption(testPerson.birthYear);
      await monthDropDown.selectOption(testPerson.birthMonth);
      await dayDropDown.selectOption(testPerson.birthDay);
      await passwordInput.fill(testPerson.password);
      await passwordConfirmationInput.fill(testPerson.password);
      await submitButton.click();
    });

    await test.step("Проверка успешной регистрации пользователя", async () => {
      await expect(fullNameField).toHaveText(testPerson.fullName);
      await expect(addressField).toHaveText(testPerson.address);
      await expect(emailField).toHaveText(testPerson.email);
      await expect(phoneField).toHaveText(testPerson.phone);
      await expect(countryField).toHaveText(testPerson.country);
      await expect(genderField).toHaveText(testPerson.gender);
      await expect(languageField).toHaveText(testPerson.language);
      await expect(skillsField).toHaveText(testPerson.skills);
      await expect(hobbiesField).toHaveText(testPerson.hobbiesList);
      await expect(dateOfBirth).toHaveText(testPerson.dateOfBirth);
      expect((await passwordField.innerText()).length).toBe(
        testPerson.password.length
      );
    });
  });
});
