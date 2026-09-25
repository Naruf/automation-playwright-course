import { timeout } from "../playwright.config";

export class LoginPage {
  constructor(page) {
    this.page = page;

    this.singupButton = page.locator('[data-qa="go-to-signup-button"]');
  }

  goToSingUpPage = async () => {
    await this.singupButton.waitFor();
    await this.singupButton.click();
    await this.page.waitForURL(/\/signup/, { timeout: 3000 });
    await this.page.pause();
  };
}
