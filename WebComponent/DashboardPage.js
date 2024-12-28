const { By } = require("selenium-webdriver");


class DashboardPage {
  constructor(driver) {
    this.driver = driver
    this.addToCartButton = By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']");
  }

  async isOnDashboard() {
    const title = await this.driver.findElement(By.className('title'))
    return title.getText()
  }
  
  async addItemToCart() {
    await this.driver.findElement(this.addToCartButton).click();
  }
}

module.exports = DashboardPage;
