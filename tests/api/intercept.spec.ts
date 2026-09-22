import { test, expect } from '@playwright/test';

// web app -> intercept the network calls and log them
// '**/*' -> Wildcard pattern for URLs

test('intercept and log request', async ({ page }) => {
    await page.route('**/*', async (route) => {
        console.log(route.request().method(), route.request().url());
        await route.continue(); //url1 -> capture, url2 -> capture
    })

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');

});

// Intercept with mocking

test('mock search data', async ({ page }) => {
    
    let fakeProducts = [
        { name: 'Fake Iphone Duo', price: '$1999' },
        { name: 'Fake Iphone Duo Ultra', price: '$3999' }        
    ]

    await page.route('**/index.php?route=product/search&search=macbook', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(fakeProducts)
        });
    });

    await page.goto('https://abc.com/index.php?route=product/search&search=macbook')
    await page.waitForTimeout(2000);
});

