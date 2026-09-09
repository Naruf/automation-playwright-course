import { test } from "@playwright/test";

test("Product Page Add To Basket", async ({ page }) => {
  await page.goto("localhost:2221");
  await page.pause();
});
