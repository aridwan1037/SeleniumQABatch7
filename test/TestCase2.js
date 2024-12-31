const { Builder } = require("selenium-webdriver");
const LoginPage = require("../WebComponent/loginPage");
const assert = require("assert");
const fs = require('fs')
const screenshotsDir ='./screenshots/';
require('dotenv').config()

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const usernameWrong = process.env.USER_NAME_WRONG;
const passwordWrong = process.env.PASSWORD_WRONG;

if (!fs.existsSync (screenshotsDir)){
  fs.mkdirSync(screenshotsDir, {recursive:true});
}

describe('TestCase 2 [login] #Smoke', function () {
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
        driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
        break
    }
  });

  //test suit dimulai dengan apa, setiap melakukan tes
  beforeEach(async function () {
    const loginPage = new LoginPage(driver);
    await loginPage.navigate(baseUrl);
    await loginPage.login(usernameWrong, passwordWrong);
  });

  //assertion & validasi
  it("Error message for invalid credential", async function () {
    const loginPage = new LoginPage(driver);
    const errorMessage =  await loginPage.getErrorMessage()
    assert.strictEqual(errorMessage, "Epic sadface: Username and password do not match any user in this service","Expected error message doesn't match");
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
