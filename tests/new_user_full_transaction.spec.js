import { test } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";
import { ProductPage } from "../page-objects/ProductsPage.js";
import { NavigationBar } from "../page-objects/Navigation.js";
import { Checkout } from "../page-objects/Checkout.js";
import { LoginPage } from "../page-objects/LoginPage.js";
import { RegisterPage } from "../page-objects/RegisterPage.js";
import { DeliveryDetailsPage } from "../page-objects/DeliveryDetailsPage.js";
import { deliveryDetails } from "../data/deliveryDetails.js";

test.only("New user full end-to-end transaction", async ({ page }) => {
  const productsPage = new ProductPage(page);
  await productsPage.visit();
  await productsPage.sortByCheapest();
  await productsPage.addProductToBasket(0);
  await productsPage.addProductToBasket(1);
  await productsPage.addProductToBasket(2);

  const navigation = new NavigationBar(page);
  await navigation.goToCheckout();

  const checkout = new Checkout(page);
  await checkout.removeCheapestProduct();
  await checkout.continueToCheckout();

  const login = new LoginPage(page);
  await login.goToSingUpPage();

  const registerPage = new RegisterPage(page);
  const email = uuidv4() + "@gmail.com";
  const password = uuidv4();
  await registerPage.singupAsNewUSer(email, password);

  const deliveryDetailsPage = new DeliveryDetailsPage(page);
  await deliveryDetailsPage.fillDeliveryDetails(deliveryDetails);
  await deliveryDetailsPage.saveDeliveryAdress();
});
