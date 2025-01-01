const { By } = require("selenium-webdriver");


class CheckoutCompletePage {
  constructor(driver) {
    this.driver = driver
    this.completeHeader = By.className("complete-header");
    this.title = By.className("title");
  }

  async isComplete() {
    const header = await this.driver.findElement(this.completeHeader)
    return header.getText()
  }
  
  async isOnCompleteCheckout() {   
    const header = await this.driver.findElement(this.title)
    return header.getText()
  }
}

module.exports = CheckoutCompletePage;
