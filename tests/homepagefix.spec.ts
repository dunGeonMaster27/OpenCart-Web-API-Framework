import { test, expect } from '../src/fixtures/pagefixtures';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
})

test('home page title test', async ({ page, homePage }) => {
    expect(await homePage.getHomePageTitle()).toBe('My Account');

    await page.waitForTimeout(500);
})

test('logout link test', async ({ page, homePage }) => {
    expect(await homePage.isLogoutLinkPresent()).toBeTruthy();

    await page.waitForTimeout(500);
})

test('all home page headers test', async ({ page, homePage }) => {
    expect((await homePage.getHomePageHeaders()).length).toBe(4);
    expect((await homePage.getHomePageHeaders())).toEqual(
        [
            'My Account',
            'My Orders',
            'My Affiliate Account',
            'Newsletter'
        ]
    );

    await page.waitForTimeout(500);
})

test('account header test', async ({ page, homePage }) => {
    expect(await homePage.isMyAccountHeaderPresent()).toBeTruthy();

    await page.waitForTimeout(500);
})

test('orders header test', async ({ page, homePage }) => {
    expect(await homePage.isMyOrdersHeaderPresent()).toBeTruthy();

    await page.waitForTimeout(500);
})

test('affiliate header test', async ({ page, homePage }) => {
    expect(await homePage.isMyAffiliateAccountHeaderPresent()).toBeTruthy();

    await page.waitForTimeout(500);
})

test('newsletter header test', async ({ page, homePage }) => {
    expect(await homePage.isNewsletterHeaderPresent()).toBeTruthy();

    await page.waitForTimeout(500);
})


// Common Features Test

test('App Logo Test', async ({ basePage }) => {
    expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('Search Box Test', async ({ basePage }) => {
    expect(await basePage.isSearchBoxVisible()).toBeTruthy();
});


test('Cart Button Test', async ({ basePage }) => {
    expect(await basePage.isCartButtonVisible()).toBeTruthy();
})


test('Footer Links Test', async ({ basePage }) => {
    expect(await basePage.getFooterLinksCount()).toBe(16);
})