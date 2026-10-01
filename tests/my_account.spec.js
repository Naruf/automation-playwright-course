import { test } from "@playwright/test";
import { MyAccountPage } from "../page-objects/MyAccountPage";
import { getLoginToken } from "../api-calls/getLoginToken";

test.only("My account using cookie injection", async ({ page }) => {
  //Make a request to get the login token
  const loginToken = await getLoginToken();
  console.warn({ loginToken });
  //Inject the login token into the browser
  const myAccount = new MyAccountPage(page);
  await myAccount.visit();
  //Injecting the cookie here
  await page.evaluate(
    ([loginTokenInsideBrowserCode]) => {
      document.cookie = "token =" + loginTokenInsideBrowserCode;
    },
    [loginToken],
  );
  //This next visit is like refreshing the page, so we assert the cookie we have just injected
  await myAccount.visit();
  await myAccount.waitForPageHeading();
});
