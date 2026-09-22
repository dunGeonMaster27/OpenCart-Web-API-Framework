# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: searchpage.spec.ts >> product selection test - macbook - MacBook Pro
- Location: tests/searchpage.spec.ts:45:5

# Error details

```
Error: locator.fill: Test ended.
Call log:
  - waiting for getByRole('textbox', { name: 'Search' })

```

# Test source

```ts
  1  | import { Locator, Page } from "@playwright/test";
  2  | import { BasePage } from "./BasePage";
  3  | 
  4  | export class HomePage extends BasePage {
  5  | 
  6  |     private readonly logoutLink: Locator;
  7  |     private readonly allHeaders: Locator;
  8  |     private readonly myAccountHeader: Locator;
  9  |     private readonly myOrdersHeader: Locator;
  10 |     private readonly myAffiliateAccountHeader: Locator;
  11 |     private readonly newsletterHeader: Locator;
  12 |     private readonly searchBox: Locator;
  13 |     private readonly searchIcon: Locator;
  14 | 
  15 | 
  16 |     constructor(page: Page) {
  17 |         super(page);
  18 |         this.logoutLink = page.getByRole('link', { name: 'Logout' }).last();
  19 |         this.allHeaders = page.getByRole('heading', { level: 2 });
  20 |         this.myAccountHeader = page.getByRole('heading', { name: 'My Account', level: 2 });
  21 |         this.myOrdersHeader = page.getByRole('heading', { name: 'My Orders', level: 2 });
  22 |         this.myAffiliateAccountHeader = page.getByRole('heading', { name: 'My Affiliate Account', level: 2 });
  23 |         this.newsletterHeader = page.getByRole('heading', { name: 'Newsletter', level: 2 });
  24 |         this.searchBox = page.getByRole('textbox', { name: 'Search' });
  25 |         this.searchIcon = page.locator('div#search button');
  26 |     }
  27 | 
  28 | 
  29 |     async getHomePageTitle(): Promise<string> {
  30 |         return await this.page.title();
  31 |     }
  32 | 
  33 |     async isLogoutLinkPresent(): Promise<boolean> {
  34 |         return await this.logoutLink.isVisible();
  35 |     }
  36 | 
  37 |     async getHomePageHeaders(): Promise<string[]> {
  38 |         return await this.allHeaders.allInnerTexts();
  39 |     }
  40 | 
  41 |     async isMyAccountHeaderPresent(): Promise<boolean> {
  42 |         return await this.myAccountHeader.isVisible();
  43 |     }
  44 | 
  45 |     async isMyOrdersHeaderPresent(): Promise<boolean> {
  46 |         return await this.myOrdersHeader.isVisible();
  47 |     }
  48 | 
  49 |     async isMyAffiliateAccountHeaderPresent(): Promise<boolean> {
  50 |         return await this.myAffiliateAccountHeader.isVisible();
  51 |     }
  52 | 
  53 |     async isNewsletterHeaderPresent(): Promise<boolean> {
  54 |         return await this.newsletterHeader.isVisible();
  55 |     }
  56 | 
  57 |     async doSearch(searchKey: string): Promise<void> {
  58 |         console.log('Search Key:', searchKey);
> 59 |         this.searchBox.fill(searchKey);
     |                        ^ Error: locator.fill: Test ended.
  60 |         this.searchIcon.click();
  61 |     }
  62 | 
  63 | 
  64 | }
```