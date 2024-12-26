const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert'); 

async function sauceDemoLoginTest(){
    //membuat koneksi dengan Browser Driver
    let driver = await new Builder().forBrowser('chrome').build();

    // exception handling
    try{
        // buka URL di Browser
        await driver.get("https://www.saucedemo.com");

        //User success login
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.xpath("//input[@id='password']")).sendKeys('secret_sauce');
        await driver.findElement(By.xpath("//input[@id='login-button']")).click();

        // Validate user berada di dashboard setelah login
        let titleText = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
        assert.strictEqual(titleText.includes('Swag Labs'), true, "Title dosn't include 'Swag Labs'")

        let menuButton = await driver.findElement(By.xpath("//button[@id='react-burger-menu-btn']"))
        assert.strictEqual(await menuButton.isDisplayed(), true, "Menu Button is not visible")

        // Add item to cart
        await driver.findElement(By.xpath(("//button[@id='add-to-cart-sauce-labs-backpack']"))).click();

        // Validate item sukses ditambahkan ke cart
        let shoppingCart = await driver.findElement(By.xpath("//span[@class='shopping_cart_badge']"))
        assert.strictEqual(await shoppingCart.isDisplayed(), true, "Shopping Cart Badge is not exist")

    } finally{
        await driver.quit();

    }
}
sauceDemoLoginTest();