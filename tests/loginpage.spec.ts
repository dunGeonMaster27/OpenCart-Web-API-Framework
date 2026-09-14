import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';


let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
})

test('login page title test', async ({ page }) => {
    expect(await loginPage.getLoginPageTitle()).toBe('Account Login');

    await page.waitForTimeout(500);
})

test('forgot password link test', async ({ page }) => {
    expect(await loginPage.isForgottenPasswordLinkPresent()).toBeTruthy();

    await page.waitForTimeout(500);
})

test('login test', async ({ page }) => {
    await loginPage.doLogin('saket@test.com', '1234');
    expect(await loginPage.getLoginPageTitle()).toBe('My Account');

    await page.waitForTimeout(500);
})

test('Invalid login error test', async ({ page }) => {
    await loginPage.doLogin('saket@test.com', '12345');
    expect(await loginPage.isInvalidLoginErrorPresent()).toBeTruthy();

    await page.waitForTimeout(500);
})