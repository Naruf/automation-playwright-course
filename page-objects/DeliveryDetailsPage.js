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
    this.continueToPaymentButton = page.getByRole("button", {
      name: "Continue to payment",
    });
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
    await this.page.pause();

    await this.saveAdressForNextTime.waitFor();
    await this.saveAdressForNextTime.click();
    await this.continueToPaymentButton.waitFor();
    await this.continueToPaymentButton.click();
    await this.page.pause();
  };
}
