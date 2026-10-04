// import * as dotenv from "dotenv";
// dotenv.config();
import { test } from "@playwright/test";
import { MyAccountPage } from "../page-objects/MyAccountPage";
import { getLoginToken } from "../api-calls/getLoginToken";
import { userDetails } from "../data/userDetails";

test.only("My account using cookie injection", async ({ page }) => {
  const loginToken = await getLoginToken(
    userDetails.username,
    userDetails.password,
  );

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
