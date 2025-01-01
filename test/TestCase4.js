const { Builder } = require("selenium-webdriver");
const LoginPage = require("../WebComponent/loginPage");
const DashboardPage = require("../WebComponent/DashboardPage");
const CartPage = require("../WebComponent/CartPage");
const CheckoutPage = require("../WebComponent/CheckoutPage");
const CheckoutOverviewPage = require('../WebComponent/CheckoutOverviewPage')
const CheckoutCompletePage = require('../WebComponent/CheckoutCompletePage')
const assert = require("assert");
const fs = require('fs')
const screenshotsDir ='./screenshots/';
require('dotenv').config()

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;
const firstName = process.env.FIRSTNAME;
const lastName = process.env.LASTNAME;
const postalCode = process.env.POSTALCODE;


if (!fs.existsSync (screenshotsDir)){
    fs.mkdirSync(screenshotsDir, {recursive:true});
}

describe('TestCase 4 [Checkout] #Regression', function () {
  this.timeout(40000);
  let driver;

  switch(browser.toLowerCase()){
    case 'firefox':
      const firefox = require("selenium-webdriver/firefox");
      options = new firefox.Options();
      options.addArguments("--headless");
      break
    case 'chrome':
    default:
      const chrome = require("selenium-webdriver/chrome");
      options = new chrome.Options();
      options.addArguments("--headless");
      break
  }

  //Run setiap mulai tes, cukup 1x saja diawal
  before(async function () {
    switch(browser.toLowerCase()){
      case 'firefox':
        driver = await new Builder().forBrowser(browser).setFirefoxOptions(options).build();
        break
      case 'chrome':
      default:
        driver = await new Builder().forBrowser(browser).setChromeOptions().build();
        break
    }
  });

  //test suit dimulai dengan apa, setiap melakukan tes
  beforeEach(async function () {
    const loginPage = new LoginPage(driver);
    await loginPage.navigate(baseUrl);
    await loginPage.login(username, password);
  });

  //assertion & validasi
  it("Checkout success", async function () {
    const dashboardPage = new DashboardPage(driver);
    const title = await dashboardPage.isOnDashboard();
    assert.strictEqual(title, "Products","Expected Dashboard title to be products");

    await dashboardPage.addItemToCart();

    const cartPage = new CartPage(driver);
    const isOnChart = await cartPage.isOnShoppingCart();
    assert.strictEqual(isOnChart, true, "Shopping Cart Badge is not exist");

    await dashboardPage.openCart()
    await cartPage.checkout()

    const checkoutPage = new CheckoutPage(driver)
    await checkoutPage.continue(firstName, lastName, postalCode)

    const checkOverviewPage = new CheckoutOverviewPage(driver);
    const itemList = await checkOverviewPage.isOnCart();
    assert.strictEqual(itemList, "Sauce Labs Backpack","Sauce Labs Backpack isn't listed on shopping vart");
    await checkOverviewPage.finish()

    const checkoutCompletePage = new CheckoutCompletePage(driver);
    const isComplete = await checkoutCompletePage.isComplete();
    const isOncompleteCheckout = await checkoutCompletePage.isOnCompleteCheckout();
    assert.strictEqual(isComplete, "Thank you for your order!","Your order is not Complete");
    assert.strictEqual(isOncompleteCheckout, "Checkout: Complete!","You are not in Checkout : Complete Page");
    

  });

  afterEach(async function () {
    const screenshoot = await driver.takeScreenshot()
    const filepath = `${screenshotsDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`; 
    fs.writeFileSync(filepath, screenshoot, 'base64');
  })

  after(async function () {
    await driver.quit();
  });

});










