import { Page } from '@playwright/test';

// Page Object for the OrangeHRM Login page
// Contains all locators and actions related to logging in
export class LoginPage {
    readonly page: Page;

    // username input field locator
    readonly userNameInput = 'input[name="username"]';
    // password input field locator
    readonly passwordInput = 'input[name="password"]';
    // submit button locator
    readonly loginButton = 'button[type="submit"]';

    // constructor receives the Playwright page object and stores it for use in all methods
    constructor(page: Page) {
        this.page = page;
    }

    // performs a full login with the provided username and password
    async login(user: string, pass: string) {
        // navigate to the base URL defined in playwright.config.ts
        await this.page.goto('/');

        // fill in the username and password fields
        await this.page.fill(this.userNameInput, user);
        await this.page.fill(this.passwordInput, pass);

        // click the login button to submit
        await this.page.click(this.loginButton);

        // wait for the dashboard URL — confirms login was successful
        await this.page.waitForURL('**/dashboard/**');
    }
}