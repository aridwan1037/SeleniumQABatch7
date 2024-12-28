const { Builder } = require("selenium-webdriver");
const LoginPage = require("./WebComponent/loginPage");
const DashboardPage = require("./WebComponent/DashboardPage");
const assert = require("assert");
const fs = require('fs')
const screenshotsDir ='./screenshots/';

if (!fs.existsSync (screenshotsDir)){
    fs.mkdirSync(screenshotsDir, {recursive:true});
}

describe('TestCase 1', function () {
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
    await loginPage.login("standard_user", "secret_sauce");
  });

  //assertion & validasi
  it("Login successfully and verify dashboard", async function () {
    const dashboardPage = new DashboardPage(driver);
    const title = await dashboardPage.isOnDashboard();
    assert.strictEqual(title, "Products","Expected Dashboard title to be products");
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










