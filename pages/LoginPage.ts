import { Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    readonly userNameInput = 'input[name="username"]';
    readonly passwordInput = 'input[name="password"]';
    readonly loginButton = 'button[type="submit"]';

    constructor(page: Page) {
        this.page = page;
    }

    async login(user: string, pass: string) {
        // Navigate to baseURL defined in config
        await this.page.goto('/');

        //perform login actions

        await this.page.fill(this.userNameInput, user);
        await this.page.fill(this.passwordInput, pass);
        await this.page.click(this.loginButton);


        //wait for the dashboard to load to confirm success
        await this.page.waitForURL('**/dashboard/**');

    }

}

