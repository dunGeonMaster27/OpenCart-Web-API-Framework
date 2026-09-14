import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    private readonly url: string;

    // 1. Private Locators
    private readonly emailId: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;
    private readonly forgottenPasswordLink: Locator;
    private readonly invalidLoginError: Locator;

    // 2. Constructor of the page class: Initialise the locators
    constructor(page: Page) {
        super(page);
        this.url = '/opencart/index.php?route=account/login';
        this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.forgottenPasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).first();
        this.invalidLoginError = page.locator('.alert.alert-danger.alert-dismissible');
    }

    // 3. Public Page Actions (Methods) / Behaviour: Encapsulation

    async goToLoginPage(): Promise<void> {
        await this.page.goto(this.url);
    }

    async getLoginPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async isForgottenPasswordLinkPresent(): Promise<boolean> {
        return await this.forgottenPasswordLink.isVisible();
    }

    async doLogin(username: string, password: string): Promise<void> {
        console.log(`user credentials: ${username}/${password}`);
        await this.emailId.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async isInvalidLoginErrorPresent(): Promise<boolean> {
        return await this.invalidLoginError.isVisible();
    }


}