export class MyAccountPage {
  constructor(page) {
    this.page = page;

    this.myAccountHeading = page.getByRole("heading", { name: "My Account" });
  }
  visit = async () => {
    await this.page.goto("/my-account");
  };
  waitForPageHeading = async () => {
    await this.myAccountHeading.waitFor();
    await this.page.pause();
  };
}
