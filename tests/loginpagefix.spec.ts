import { CsvHelper } from '../src/utils/CsvHelper';
import { ExcelHelper } from '../src/utils/ExcelHelper';
import { JsonHelper } from '../src/utils/JsonHelper';
import { test, expect } from '../src/fixtures/pagefixtures';
import * as allure from 'allure-js-commons';
import { meta, log, testData } from 'reporting-labs';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
})

test('login page title test', async ({ page, loginPage }) => {
    meta({ owner: 'Saket', priority: 'P1', severity: 'minor', story: 'US101', epic: 'ep303', feature: 'F29', issue: 'bug34' })

    expect(await loginPage.getPageTitle()).toBe('Account Login');
    await log('Login Page Title:', await loginPage.getPageTitle());

    await page.waitForTimeout(500);
})

test('forgot password link test', async ({ page, loginPage }) => {
    meta({ owner: 'Saket 1', priority: 'P1', severity: 'minor', story: 'US101', epic: 'ep303', feature: 'F29', issue: 'bug34' })
    expect(await loginPage.isForgottenPasswordLinkPresent()).toBeTruthy();

    await page.waitForTimeout(500);
})

test('valid user login test', async ({ page, loginPage }) => {
    // await allure.suite("Login Tests");
    // await allure.severity("critical");
    // await allure.feature("Authentication");
    // await allure.story("Valid Login");
    // await allure.description("Verify user can login with valid credentials");

    // await allure.step("Login with valid creds", async () => {
    //     await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
    // });

    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
    expect(await loginPage.getPageTitle()).toBe('My Account');

    await page.waitForTimeout(500);
})

test('Invalid user login test', async ({ page, loginPage }) => {
    await loginPage.doLogin('saket@test.com', '12345');
    expect(await loginPage.isInvalidLoginErrorPresent()).toBeTruthy();

    await page.waitForTimeout(500);
})

// Pros:
// 1. Light weight, easy to maintain/read
// 2. Third party library, no licenses, flat files, fs, good for large data set
// Data Driven 1: Read CSV directly from the CSV file and loop the test method
let login_csv_data = CsvHelper.readCsv('src/testdata/logindata.csv');
for (let user of login_csv_data) {
    test(`Invalid user login test with csv file - ${user.username} - ${user.password}`, async ({ loginPage }) => {
        meta({ owner: 'Saket2', priority: 'P1', severity: 'minor', story: 'US101', epic: 'ep303', feature: 'F29', issue: 'bug34' })
        await testData(login_csv_data, 'Invalid Login Data')

        await loginPage.doLogin(user.username, user.password);
        expect(await loginPage.isInvalidLoginErrorPresent()).toBeTruthy();
    });
}


// Cons:
// 1. Maintenance
// 2. Microsoft Licenses
// Data Driven 2: Read xlsx directly from the excel file and loop the test method
let login_xlsx_data = ExcelHelper.readExcel('src/testdata/opencartdata.xlsx', 'login');
for (let user of login_xlsx_data) {
    test(`Invalid user login test with excel file - ${user.username} - ${user.password}`, async ({ loginPage }) => {
        meta({ owner: 'Saket3', priority: 'P2', severity: 'minor', story: 'US101', epic: 'ep303', feature: 'F29', issue: 'bug34' });
        await testData(login_xlsx_data, 'Invalid Login Data');

        await loginPage.doLogin(String(user.username), String(user.password));
        expect(await loginPage.isInvalidLoginErrorPresent()).toBeTruthy();
    });
}


// Pros:
// 1. In built method: parse, lightweight, smaller data set
// Data Driven 3: Read JSON directly from the json file and loop the test method
let login_json_data = JsonHelper.readJson('src/testdata/logindata.json');
for (let user of login_json_data) {
    test(`Invalid user login test with json file - ${user.username} - ${user.password}`, async ({ loginPage }) => {
        meta({ owner: 'Saket', priority: 'P2', severity: 'minor', story: 'US101', epic: 'ep303', feature: 'F29', issue: 'bug34' });
        await testData(login_json_data, 'Invalid Login Data');

        await loginPage.doLogin(String(user.username), String(user.password));
        expect(await loginPage.isInvalidLoginErrorPresent()).toBeTruthy();
    });
}


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