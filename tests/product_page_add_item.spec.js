import { test, expect } from "@playwright/test";

test("Product Page Add To Basket", async ({ page }) => {
  await page.goto("/");

  const addProductInCartButton = page
    .locator('[data-qa="product-button"]')
    .first();
  const basketCount = page.locator('[data-qa="header-basket-count"]');
  const checkoutElemnt = page.getByRole("link", { name: "Checkout" });

  await addProductInCartButton.waitFor();

  await expect(addProductInCartButton).toHaveText("Add to Basket");
  await expect(basketCount).toHaveText("0");

  await addProductInCartButton.click();

  await expect(addProductInCartButton).toHaveText("Remove from Basket");
  await expect(basketCount).toHaveText("1");

  await checkoutElemnt.waitFor();
  await checkoutElemnt.click();
  await page.waitForURL("/basket");
});
