export class ThankyouPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole("heading", {
      name: "Thank you for shopping with",
    });
    this.backToShopButton = page.getByRole("button", {
      name: "Back to shop",
    });
  }

  goBackToShop = async () => {
    await this.heading.waitFor();
    await this.backToShopButton.waitFor();
    await this.backToShopButton.click();
    await this.page.waitForURL(/\//, { timeout: 3000 });
    await this.page.pause();
  };
}
