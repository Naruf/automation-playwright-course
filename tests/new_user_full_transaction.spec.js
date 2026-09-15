import { test } from "@playwright/test";
import { ProductPage } from "../page-objects/ProductPage.js";

test.only("New user full end-to-end transaction", async ({ page }) => {
  const productsPage = new ProductPage(page);
  await productsPage.visit();
  await page.pause();
});
