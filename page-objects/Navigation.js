import { isDesktopViewport } from "../utils/isDesktopViewport.js";

export class NavigationBar {
  constructor(page) {
    this.page = page;

    this.basketCounter = page.locator('[data-qa="header-basket-count"]');
    this.checkout = page.getByRole("link", { name: "checkout" });
    this.mobileBurgerbutton = page.locator('[data-qa="burger-button"]');
  }

  getBasketCount = async () => {
    await this.basketCounter.waitFor();
    const text = await this.basketCounter.innerText();
    return parseInt(text, 10);
  };

  goToCheckout = async () => {
    if (!isDesktopViewport(this.page)) {
      await this.mobileBurgerbutton.waitFor();
      await this.mobileBurgerbutton.click();
    }
    await this.checkout.waitFor();
    await this.checkout.click();
    await this.page.waitForURL("/basket");
  };
}
