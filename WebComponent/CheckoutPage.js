const { By } = require("selenium-webdriver");

class CheckoutPage {
  constructor(driver) {
    this.driver = driver;
    this.firstName = By.id("first-name");
    this.lastName = By.id("last-name");
    this.postalCode = By.id("postal-code");
    this.continueButton = By.id("continue");
  }

  async continue(firstName, lastName, postalCode) {
    await this.driver.findElement(this.firstName).sendKeys(firstName)
    await this.driver.findElement(this.lastName).sendKeys(lastName)
    await this.driver.findElement(this.postalCode).sendKeys(postalCode)
    await this.driver.findElement(this.continueButton).click()
  }

}

module.exports = CheckoutPage;
