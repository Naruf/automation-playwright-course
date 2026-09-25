export class NavigationBar {
  constructor(page) {
    this.page = page;

    this.basketCounter = page.locator('[data-qa="header-basket-count"]');
    this.checkout = page.getByRole("link", { name: "checkout" });
  }

  getBasketCount = async () => {
    await this.basketCounter.waitFor();
    const text = await this.basketCounter.innerText();
    return parseInt(text, 10);
  };

  goToCheckout = async () => {
    await this.checkout.waitFor();
    await this.checkout.click();
    await this.page.waitForURL("/basket");
  };
}
