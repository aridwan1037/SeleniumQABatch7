const { By } = require("selenium-webdriver");


class DashboardPage {
  constructor(driver) {
    this.driver = driver
    this.addToCartButton = By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']");
    this.cartButton = By.css(".shopping_cart_link");
  }

  async isOnDashboard() {
    const title = await this.driver.findElement(By.className('title'))
    return title.getText()
  }
  
  async addItemToCart() {
    await this.driver.findElement(this.addToCartButton).click();
  }

  async openCart(){
    await this.driver.findElement(this.cartButton).click()
  }
}

module.exports = DashboardPage;
