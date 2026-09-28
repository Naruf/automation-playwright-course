export class RegisterPage {
  constructor(page) {
    this.page = page;

    this.userNameField = page.getByRole("textbox", { name: "E-Mail" });
    this.passwordField = page.getByRole("textbox", { name: "Password" });
    this.registerButton = page.getByRole("button", { name: "Register" });
  }

  singupAsNewUSer = async (email, password) => {
    await this.userNameField.waitFor();
    // const emailId = uuidv4();
    // const email = emailId + "@gmail.com";
    await this.userNameField.fill(email);
    await this.passwordField.waitFor();
    // const password = uuidv4();
    await this.passwordField.fill(password);
    await this.registerButton.waitFor();
    await this.registerButton.click();
  };
}
