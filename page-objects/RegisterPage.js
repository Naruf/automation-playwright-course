export class RegisterPage {
  constructor(page) {
    this.page = page;

    this.userNameField = page.getByRole("textbox", { name: "E-Mail" });
    this.passwordField = page.getByRole("textbox", { name: "Password" });
    this.registerButton = page.getByRole("button", { name: "Register" });
  }

  singupAsNewUSer = async () => {
    await this.userNameField.waitFor();
    await this.userNameField.fill("newUser@nadia1.com");
    await this.passwordField.waitFor();
    await this.passwordField.fill("123456user");
    await this.registerButton.waitFor();
    await this.registerButton.click();
    await this.page.pause();
  };
}
