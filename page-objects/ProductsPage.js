import { expect } from "@playwright/test";
import { NavigationBar } from "./Navigation";

export class ProductPage {
  constructor(page) {
    this.page = page;

    this.addButtons = page.locator('[data-qa="product-button"]');
    this.sortDropdown = page.locator('[data-qa="sort-dropdown"]');
    this.productTitle = page.locator('[data-qa="product-title"]');
  }

  visit = async () => {
    await this.page.goto("/");
  };

  addProductToBasket = async (index) => {
    const specificAddButton = this.addButtons.nth(index);
    await specificAddButton.waitFor();
    await expect(specificAddButton).toHaveText("Add to Basket");
    const navigation = new NavigationBar(this.page);
    const basketCounterBeforeAdding = await navigation.getBasketCount();
    await specificAddButton.click();
    await expect(specificAddButton).toHaveText("Remove from Basket");
    const basketCounterAfterAdding = await navigation.getBasketCount();
    expect(basketCounterAfterAdding).toBeGreaterThan(basketCounterBeforeAdding);
  };

  sortByCheapest = async () => {
    await this.sortDropdown.waitFor();
    await this.productTitle.first().waitFor();
    //WaitFor is used to assert that the title exists
    const productTitleBeforeSorting = await this.productTitle.allInnerTexts();
    //define what are the titles sorted before changing the filter
    await this.sortDropdown.selectOption("price-asc");
    const productTitleAfterSorting = await this.productTitle.allInnerTexts();
    //define the new order of the titles after filtering
    expect(productTitleAfterSorting).not.toEqual(productTitleBeforeSorting);
    //assert before and after result using expect

    await this.page.pause();
  };
}
