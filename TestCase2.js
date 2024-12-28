const { Builder } = require("selenium-webdriver");
const LoginPage = require("./WebComponent/loginPage");
const assert = require("assert");

describe('TestCase 2', function () {
  this.timeout(40000);
  let driver;

  //Run setiap mulai tes, cukup 1x saja diawal
  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  //test suit dimulai dengan apa, setiap melakukan tes
  beforeEach(async function () {
    const loginPage = new LoginPage(driver);
    await loginPage.navigate();
    await loginPage.login("haha", "hihi");
  });

  //assertion & validasi
  it("Error message for invalid credential", async function () {
    const loginPage = new LoginPage(driver);
    const errorMessage =  await loginPage.getErrorMessage()
    assert.strictEqual(errorMessage, "Epic sadface: Username and password do not match any user in this service","Expected error message doesn't match");
  });

  after(async function () {
    await driver.quit();
  });
});
