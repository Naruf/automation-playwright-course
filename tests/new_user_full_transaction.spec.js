import { test } from "@playwright/test";
import { ProductPage } from "../page-objects/ProductsPage";
import { NavigationBar } from "../page-objects/Navigation";

test.only("New user full end-to-end transaction", async ({ page }) => {
  const productsPage = new ProductPage(page);
  await productsPage.visit();
  await productsPage.addProductToBasket(0);
  await productsPage.addProductToBasket(1);
  await productsPage.addProductToBasket(2);
  const navigation = new NavigationBar(page);
  await navigation.goToCheckout();
});
