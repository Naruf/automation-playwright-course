import { expect } from "@playwright/test";

export class PaymentPage {
  constructor(page) {
    this.page = page;
    this.discountCode = page
      .frameLocator('[data-qa="active-discount-container"]')
      .locator('[data-qa="discount-code"]');
    this.discountInputField = page.locator('[data-qa="discount-code-input"]');
  }

  activateDiscount = async () => {
    await this.discountCode.waitFor();
    const code = await this.discountCode.innerText();
    await this.discountInputField.waitFor();
    await this.discountInputField.fill(code);
    await expect(this.discountInputField).toHaveValue(code);
    await this.page.pause();
  };
}
