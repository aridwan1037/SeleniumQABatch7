const { By } = require("selenium-webdriver");


class CheckOverviewPage {
  constructor(driver) {
    this.driver = driver
    this.addToCartButton = By.xpath("//div[@class='inventory_item_name']");
    this.finishButton = By.id("finish");
  }

  async isOnCart() {
    const onChart = await this.driver.findElement(By.xpath("//div[@class='inventory_item_name']"))
    return onChart.getText()
  }
  
  async finish() {
    await this.driver.findElement(this.finishButton).click();
  }
}

module.exports = CheckOverviewPage;
