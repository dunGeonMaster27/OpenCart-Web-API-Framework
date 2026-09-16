import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
})

test('search results test', async ({ page, homePage, searchResultsPage }) => {
    expect(await homePage.doSearch('macbook'));
    await page.waitForTimeout(1000);

    let totalResults = await searchResultsPage.getSearchResultCount();
    console.log('Total products:', totalResults);
    expect(totalResults).toBe(3);

    await page.waitForTimeout(1000);
})

test('product selection test', async ({ page, homePage, searchResultsPage }) => {
    expect(await homePage.doSearch('macbook'));
    await searchResultsPage.selectProduct('MacBook Pro');

    await page.waitForTimeout(1000);
})


let product_data = CsvHelper.readCsv('src/testdata/product.csv');
for (let product of product_data) {
    test(`search results test - ${product.searchkey} - ${product.productname}`, async ({ page, homePage, searchResultsPage }) => {
        expect(await homePage.doSearch(product.searchkey));
        await page.waitForTimeout(1000);

        let totalResults = await searchResultsPage.getSearchResultCount();
        console.log('Total products:', totalResults);
        expect(totalResults).toBe(Number(product.resultcount));

        await page.waitForTimeout(1000);
    })
}


let products = CsvHelper.readCsv('src/testdata/product.csv');
for (let product of products) {
    test(`product selection test - ${product.searchkey} - ${product.productname}`, async ({ homePage, searchResultsPage }) => {
        expect(await homePage.doSearch(product.searchkey));
        await searchResultsPage.selectProduct(product.productname);
    })
}