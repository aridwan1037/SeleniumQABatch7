const { By } = require("selenium-webdriver");
const assert = require("assert");

class CheckoutPage {
  constructor(driver) {
    this.driver = driver;
    this.firstName = By.id("first-name");
    this.lastName = By.id("last-name");
    this.postalCode = By.id("postal-code");
    this.continue = By.id("continue");
  }

  async continue(firstName, lastName, postalCode) {
    await this.driver.findElement(this.firstName).sendKeys(firstName)
    await this.driver.findElement(this.lastName).sendKeys(lastName)
    await this.driver.findElement(this.postalCode).sendKeys(postalCode)
    await this.driver.findElement(this.continue).click()
  }

}

module.exports = CheckoutPage;
