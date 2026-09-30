import { expect } from "@playwright/test";

export class PaymentPage {
  constructor(page) {
    this.page = page;
    this.discountCode = page
      .frameLocator('[data-qa="active-discount-container"]')
      .locator('[data-qa="discount-code"]');
    this.discountInputField = page.locator('[data-qa="discount-code-input"]');
    this.activeDiscountButton = page.locator(
      '[data-qa="submit-discount-button"]',
    );
    this.discountConfirmationMessage = page.locator(
      '[data-qa="discount-active-message"]',
    );
    this.discountedPrice = page.locator(
      '[data-qa="total-with-discount-value"]',
    );
    this.totalPrice = page.locator('[data-qa="total-value"]');
  }

  activateDiscount = async () => {
    await this.discountCode.waitFor();
    const code = await this.discountCode.innerText();
    await this.discountInputField.waitFor();
    //option 1 for laggy inputs
    await this.discountInputField.fill(code);
    await expect(this.discountInputField).toHaveValue(code);

    //Option 2for laggy inputs: slow typping
    // await this.discountInputField.focus();
    // await this.page.keyboard.type(code, { delay: 1000 });
    // expect(await this.discountInputField.inputValue()).toBe(code);

    // expect(await this.discountConfirmationMessage.isVisible()).toBe(false);
    await expect(this.discountConfirmationMessage).toBeHidden();
    await this.activeDiscountButton.waitFor();
    await this.activeDiscountButton.click();
    await this.discountConfirmationMessage.waitFor();

    // expect(await this.discountConfirmationMessage.isVisible()).toBe(true);
    await expect(this.discountConfirmationMessage).toBeVisible();

    await this.totalPrice.waitFor();
    const totalPriceText = await this.totalPrice.innerText();
    const totalPriceStringNumber = totalPriceText.replace("$", "");
    const totalPriceInt = parseInt(totalPriceStringNumber, 10);

    await this.discountedPrice.waitFor();
    const discountedPriceText = await this.discountedPrice.innerText();
    const discountedPriceStringNumber = discountedPriceText.replace("$", "");
    const discountedPriceInt = parseInt(discountedPriceStringNumber, 10);

    expect(discountedPriceInt).toBeLessThan(totalPriceInt);

    await this.page.pause();
  };
}
