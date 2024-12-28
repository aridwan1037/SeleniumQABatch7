const { By } = require("selenium-webdriver");
const assert = require("assert");

class CartPage {
  constructor(driver) {
    this.driver = driver;
    this.cartBadge = By.xpath("//span[@class='shopping_cart_badge']");
  }

  async isOnShoppingCart() {
    const cartBadgeElement = await this.driver.findElement(this.cartBadge);
    const isOnChart = await cartBadgeElement.isDisplayed();
    return isOnChart
  }
}

module.exports = CartPage;
