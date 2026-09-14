import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {

    private readonly logoutLink: Locator;
    private readonly allHeaders: Locator;
    private readonly myAccountHeader: Locator;
    private readonly myOrdersHeader: Locator;
    private readonly myAffiliateAccountHeader: Locator;
    private readonly newsletterHeader: Locator;
    private readonly searchBox: Locator;
    private readonly searchIcon: Locator;


    constructor(page: Page) {
        super(page);
        this.logoutLink = page.getByRole('link', { name: 'Logout' }).last();
        this.allHeaders = page.getByRole('heading', { level: 2 });
        this.myAccountHeader = page.getByRole('heading', { name: 'My Account', level: 2 });
        this.myOrdersHeader = page.getByRole('heading', { name: 'My Orders', level: 2 });
        this.myAffiliateAccountHeader = page.getByRole('heading', { name: 'My Affiliate Account', level: 2 });
        this.newsletterHeader = page.getByRole('heading', { name: 'Newsletter', level: 2 });
        this.searchBox = page.getByRole('textbox', { name: 'Search' });
        this.searchIcon = page.locator('div#search button');
    }


    async getHomePageTitle(): Promise<string> {
        return await this.page.title();
    }

    async isLogoutLinkPresent(): Promise<boolean> {
        return await this.logoutLink.isVisible();
    }

    async getHomePageHeaders(): Promise<string[]> {
        return await this.allHeaders.allInnerTexts();
    }

    async isMyAccountHeaderPresent(): Promise<boolean> {
        return await this.myAccountHeader.isVisible();
    }

    async isMyOrdersHeaderPresent(): Promise<boolean> {
        return await this.myOrdersHeader.isVisible();
    }

    async isMyAffiliateAccountHeaderPresent(): Promise<boolean> {
        return await this.myAffiliateAccountHeader.isVisible();
    }

    async isNewsletterHeaderPresent(): Promise<boolean> {
        return await this.newsletterHeader.isVisible();
    }

    async doSearch(searchKey: string): Promise<void> {
        console.log('Search Key:', searchKey);
        this.searchBox.fill(searchKey);
        this.searchIcon.click();
    }


}