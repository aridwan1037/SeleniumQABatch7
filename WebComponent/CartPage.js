const { By } = require("selenium-webdriver");

class CartPage {
  constructor(driver) {
    this.driver = driver;
    this.cartBadge = By.xpath("//span[@class='shopping_cart_badge']");
    this.checkoutButton = By.id("checkout");
  }

  async isOnShoppingCart() {
    const cartBadgeElement = await this.driver.findElement(this.cartBadge);
    const isOnChart = await cartBadgeElement.isDisplayed();
    return isOnChart
  }

  async checkout(){
    await this.driver.findElement(this.checkoutButton).click()
  }
}

module.exports = CartPage;
