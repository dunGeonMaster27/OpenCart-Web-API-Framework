import { CsvHelper } from '../src/utils/CsvHelper';
import { ExcelHelper } from '../src/utils/ExcelHelper';
import { JsonHelper } from '../src/utils/JsonHelper';
import { test, expect } from '../src/fixtures/pagefixtures';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
})

test('login page title test', async ({ page, loginPage }) => {
    expect(await loginPage.getLoginPageTitle()).toBe('Account Login');

    await page.waitForTimeout(500);
})

test('forgot password link test', async ({ page, loginPage }) => {
    expect(await loginPage.isForgottenPasswordLinkPresent()).toBeTruthy();

    await page.waitForTimeout(500);
})

test('valid user login test', async ({ page, loginPage }) => {
    await loginPage.doLogin(process.env.USERNAME, process.env.PASSWORD);
    expect(await loginPage.getLoginPageTitle()).toBe('My Account');

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
        await loginPage.doLogin(String(user.username), String(user.password));
        expect(await loginPage.isInvalidLoginErrorPresent()).toBeTruthy();
    });
}
