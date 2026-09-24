import { test, expect } from '../src/fixtures/pagefixtures';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
})

test('product header test', async ({ page, homePage, searchResultsPage, productInfoPage }) => {
    expect(await homePage.doSearch('macbook'));
    await searchResultsPage.selectProduct('MacBook Pro');
    await page.waitForTimeout(1000);

    expect(await productInfoPage.getProductHeader()).toBe('MacBook Pro');

    await page.waitForTimeout(1000);
})

test('product images count test', async ({ page, homePage, searchResultsPage, productInfoPage }) => {
    expect(await homePage.doSearch('macbook'));
    await searchResultsPage.selectProduct('MacBook Pro');
    expect(await productInfoPage.getProductImagesCount()).toBe(4);

    await page.waitForTimeout(1000);
})

test('product info test', async ({ page, homePage, searchResultsPage, productInfoPage }) => {
    expect(await homePage.doSearch('macbook'));
    await searchResultsPage.selectProduct('MacBook Pro');
    await page.waitForTimeout(1000);

    let productInfo = await productInfoPage.getProductInfo();
    console.log('productInfo', productInfo);

    expect.soft(productInfo.get('productHeader')).toBe('MacBook Pro');
    expect.soft(productInfo.get('productImagesCount')).toBe(4);
    expect.soft(productInfo.get('Brand')).toBe('Apple');
    expect.soft(productInfo.get('productPrice')).toBe('$2,000.00');

    await page.waitForTimeout(1000);
})


// Common Features Test

test('App Logo Test', async ({ basePage }) => {
    expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('Search Box Test', async ({ basePage }) => {
    expect(await basePage.isSearchBoxVisible()).toBeTruthy();
});


test('Cart Button Test', async ({ basePage,page }) => {
    await page.pause();
    expect(await basePage.isCartButtonVisible()).toBeTruthy();

})


test('Footer Links Test', async ({ basePage }) => {
    expect(await basePage.getFooterLinksCount()).toBe(16);
})