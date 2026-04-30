import { Page, expect } from '@playwright/test';
// Page Object for the Leave section of OrangeHRM
// Contains all locators and actions related to the Leave pages
export class LeavePage {
    readonly page: Page;

    // sidebar link to expand the Leave Menu
    readonly leaveOption = 'a:has-text("Leave")';
    // heading that confirms that we are on Leave page
    readonly leaveHeader = 'h6:has-text("Leave")';
    // Leave List submenu
    readonly leaveListOption = 'a:has-text("Leave List")';
    // from and to date inputs
    readonly fromDateInput = 'input[placeholder="yyyy-dd-mm"]:nth-of-type(1)';
    readonly toDateInput = 'input[placeholder="yyyy-dd-mm"]:nth-of-type(2)';
    // search button
    readonly searchButton = 'button:has-text("Search")';
    // results grid that appears after search
    readonly resultsGrid = '.oxd-table';


    // constructor receives the Playwright page object and stores it for use in all methods

    constructor(page: Page) {
        this.page = page;

    }

    // navigates to Leave > Leave List via the sidebar
    async navigateToLeaveList() {
        // 1. click the Leave option in the sidebar to expand the submenu
        await this.page.click(this.leaveOption);

        // wait for the heading to confirm we are on the right page
        // wait for the heading — confirms the page is ready before we continue

        await this.page.waitForSelector(this.leaveHeader, { state: 'visible' });

        // click Leave List from the expanded submenu
        await this.page.click(this.leaveListOption);
    }

    // fills in the From and To date fields with the provided date range
    async setDateRange(fromDate: string, toDate: string) {
        const dateInputs = this.page.locator('input[placeholder="yyyy-dd-mm"]');
        await dateInputs.nth(0).fill(fromDate);
        await dateInputs.nth(1).fill(toDate);
    }

    // clicks the Search button to trigger the leave search
    async clickSearch() {
        await this.page.click(this.searchButton);
    }

    // asserts that the results grid is visible after search executes
    async assertResultsGridVisible() {
        await expect(this.page.locator(this.resultsGrid)).toBeVisible();
    }
}