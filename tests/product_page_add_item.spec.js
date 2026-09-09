import { test } from "@playwright/test";

test("Product Page Add To Basket", async ({ page }) => {
  await page.goto("localhost:2221");

  const addProductInCartButton = page
    .getByRole("button", {
      name: "Add to Basket",
    })
    .first();
  await addProductInCartButton.click();
  await page.pause();
});
