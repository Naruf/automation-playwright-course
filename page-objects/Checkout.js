import { expect } from "@playwright/test";

export class Checkout {
  constructor(page) {
    this.page = page;
    this.basketCard = page.locator('[data-qa="basket-card"]');
    this.basketItemPrice = page.locator('[data-qa="basket-item-price"]');
    this.basketCardRemoveItemButton = page.locator(
      '[data-qa="basket-card-remove-item"]',
    );
    //In the constructor, we need locators for those elements that will be involved in the method we are creating inside this class. That is: barket cards, then item price and remove button.
  }

  removeCheapestProduct = async () => {
    await this.basketCard.first().waitFor();
    const itemBeforeRemoval = await this.basketCard.count();
    //This line will chech the number of card before removing the desired item
    await this.basketItemPrice.first().waitFor();
    // first()is used to check any of the cards tp be loaded. If one is loaded, the others are too.
    const allPricesTexts = await this.basketItemPrice.allInnerTexts();
    //allInnerTexts() is used to check text inside the element basketItemPrice
    const justNumbers = allPricesTexts.map((element) => {
      const withoutDollarSing = element.replace("$", "");
      return parseInt(withoutDollarSing, 10);
    });
    //the .map() method will make the function to go and check all texts in the element one by one and appliying the update on each one
    //use of replace() to get rid of the $ sign. It needs to parameters: 1. the actual value, 2, the new value. No value is entered ("")
    //parseInt() is used to swap from one type of variable to an Integer. It needs to parameters, :1. variable name ,2. 10 for decimals
    console.warn({ allPricesTexts });
    console.warn({ justNumbers });
    //console.warn is used as console.log but it highlights the value in a different colour, so you recognise it easier
    const smallestPrice = Math.min(...justNumbers);
    //Math.min (...justNumbers). 1.Math.min is used to get the smallest value in a array of values. 2. (...variableName): the 3 dots make the elements treated as a list of values instead of passing them one by one.
    const smallesPlriceIdx = justNumbers.indexOf(smallestPrice);
    const specificRemoveButton =
      this.basketCardRemoveItemButton.nth(smallesPlriceIdx);
    //indexOf() finds the position of a value inside an array or string. It tells you where something is located (or that it doesn't exist)
    await specificRemoveButton.waitFor();
    await specificRemoveButton.click();
    //.nth() is a locator method used when a selector matches multiple elements and you want to target one at a specific position
    //Once the right element is mapped, you first wairFor() so it loads properly first. Then you click() so the click action comes next
    await expect(this.basketCard).toHaveCount(itemBeforeRemoval - 1);
    //with this line using expect we assert that the number of basket card has gone done -1 after clicking the 'remove' button
    await this.page.pause();
  };
}
