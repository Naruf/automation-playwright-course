import { expect } from "@playwright/test";

export class DeliveryDetailsPage {
  constructor(page) {
    this.page = page;

    this.userName = page.getByRole("textbox", { name: "First name" });
    this.userLastName = page.getByRole("textbox", { name: "Last name" });
    this.street = page.getByRole("textbox", { name: "Street" });
    this.postCode = page.getByRole("textbox", { name: "Post code" });
    this.city = page.getByRole("textbox", { name: "City" });
    this.countryDropdown = page.locator('[data-qa="country-dropdown"]');
    this.saveAdressForNextTime = page.getByRole("button", {
      name: "Save address for next time",
    });
    this.savedAdressBox = page.locator('[data-qa="saved-address-container"]');
    this.savedAdressFirstName = page.locator(
      '[data-qa="saved-address-firstName"]',
    );
    this.savedAdressLastName = page.locator(
      '[data-qa="saved-address-lastName"]',
    );
    this.savedAdressStreet = page.locator('[data-qa="saved-address-street"]');
    this.savedAdressPostCode = page.locator(
      '[data-qa="saved-address-postcode"]',
    );
    this.savedAdressCity = page.locator('[data-qa="saved-address-city"]');
    this.savedAdressCountry = page.locator('[data-qa="saved-address-country"]');
  }

  fillDeliveryDetails = async (deliveryDetails) => {
    await this.userName.waitFor();
    await this.userName.fill(deliveryDetails.firstName);
    await this.userLastName.waitFor();
    await this.userLastName.fill(deliveryDetails.lastName);
    await this.street.waitFor();
    await this.street.fill(deliveryDetails.street);
    await this.postCode.waitFor();
    await this.postCode.fill(deliveryDetails.postCode);
    await this.city.waitFor();
    await this.city.fill(deliveryDetails.city);
    await this.countryDropdown.waitFor();
    await this.countryDropdown.selectOption(deliveryDetails.country);

    await this.saveAdressForNextTime.waitFor();
    await this.saveAdressForNextTime.click();

    await this.page.pause();

    // await this.continueToPaymentButton.waitFor();
    // await this.continueToPaymentButton.click();

    // await this.page.pause();
  };

  saveDeliveryAdress = async () => {
    const addresssCountBeforeSaving = await this.savedAdressBox.count();
    await this.saveAdressForNextTime.waitFor();
    await this.saveAdressForNextTime.click();
    await this.savedAdressBox.waitFor();

    await expect(this.savedAdressBox).toHaveCount(
      addresssCountBeforeSaving + 1,
    );
    await this.savedAdressFirstName.first().waitFor();
    expect(await this.savedAdressFirstName.first().innerText()).toBe(
      await this.userName.inputValue(),
    );

    await this.savedAdressStreet.first().waitFor();
    expect(await this.savedAdressStreet.first().innerText()).toBe(
      await this.street.inputValue(),
    );

    await this.savedAdressPostCode.first().waitFor();
    expect(await this.savedAdressPostCode.first().innerText()).toBe(
      await this.postCode.inputValue(),
    );

    await this.savedAdressCity.first().waitFor();
    expect(await this.savedAdressCity.first().innerText()).toBe(
      await this.city.inputValue(),
    );
    await this.savedAdressFirstName.first().waitFor();
    expect(await this.savedAdressFirstName.first().innerText()).toBe(
      await this.userName.inputValue(),
    );
    await this.savedAdressCountry.first().waitFor();
    expect(await this.savedAdressCountry.first().innerText()).toBe(
      await this.countryDropdown.inputValue(),
    );
    await this.page.pause();
  };
}
