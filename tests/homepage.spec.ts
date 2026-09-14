import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';


let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogin('saket@test.com', '1234');

    homePage = new HomePage(page);
})

test('home page title test', async ({ page }) => {
    expect(await homePage.getHomePageTitle()).toBe('My Account');

    await page.waitForTimeout(500);
})

test('logout link test', async ({ page }) => {
    expect(await homePage.isLogoutLinkPresent()).toBeTruthy();

    await page.waitForTimeout(500);
})

test('all home page headers test', async ({ page }) => {
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

test('account header test', async ({ page }) => {
    expect(await homePage.isMyAccountHeaderPresent()).toBeTruthy();

    await page.waitForTimeout(500);
})

test('orders header test', async ({ page }) => {
    expect(await homePage.isMyOrdersHeaderPresent()).toBeTruthy();

    await page.waitForTimeout(500);
})

test('affiliate header test', async ({ page }) => {
    expect(await homePage.isMyAffiliateAccountHeaderPresent()).toBeTruthy();

    await page.waitForTimeout(500);
})

test('newsletter header test', async ({ page }) => {
    expect(await homePage.isNewsletterHeaderPresent()).toBeTruthy();

    await page.waitForTimeout(500);
})

