import { Page, expect} from '@playwright/test';

export class LeavePage {
    readonly page: Page;

    // we find the 'Leave' link by its text in the sidebar
    readonly leaveOption = 'a:has-text("Leave")';
   // the header  that appears once the page loads
    readonly leaveHeader = 'h6:has-text("Leave")';     
    // Leave List submenu item
    readonly leaveListOption = 'a:has-text("Leave List")';
    // date inputs
    readonly fromDateInput = 'input[placeholder="yyyy-dd-mm"]:nth-of-type(1)';
    readonly toDateInput = 'input[placeholder="yyyy-dd-mm"]:nth-of-type(2)';
    // search button
    readonly searchButton = 'button:has-text("Search")';
    // results grid
    readonly resultsGrid = '.oxd-table';

    constructor(page: Page){
        this.page = page;

    }

    async navigateToLeaveList(){
        // 1. click the Leave option in the sidebar
        await this.page.click(this.leaveOption);

        // wait for the heading to confirm we are on the right page
        
        await this.page.waitForSelector(this.leaveHeader, { state: 'visible' });

        // click Leave List from the submenu
        await this.page.click(this.leaveListOption);
    }

    async setDateRange(fromDate: string, toDate: string) {
        const dateInputs = this.page.locator('input[placeholder="yyyy-dd-mm"]');
        await dateInputs.nth(0).fill(fromDate);
        await dateInputs.nth(1).fill(toDate);
    }

    async clickSearch() {
        await this.page.click(this.searchButton);
    }

    async assertResultsGridVisible() {
        await expect(this.page.locator(this.resultsGrid)).toBeVisible();
    }
}