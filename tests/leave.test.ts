import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LeavePage } from '../pages/LeavePage';

// End-to-end test scenario based on the assessment brief
// Scenario: Search for scheduled leave in OrangeHRM
test('Scenario: Search for scheduled leave', async ({ page }) => {

    // create instances of the page objects
    const login = new LoginPage(page);
    const leave = new LeavePage(page);

    // Step 1 — login using credentials stored in .env file
    await test.step('Given Alice logs into OrangeHR', async () => {
        await login.login(process.env.ORANGEHR_USERNAME!, process.env.ORANGEHR_PASSWORD!);
    });

    // Step 2 — navigate to Leave > Leave List via the sidebar
    await test.step('When Alice navigates to Leave', async () => {
        await leave.navigateToLeaveList();
    });

    // Step 3 — set a date range to search within
    await test.step('Then Alice can set a date range', async () => {
        await leave.setDateRange('2024-01-01', '2024-12-31');
    });

    // Step 4 — click Search and assert the results grid is visible
    // we assert the grid loads, not that results exist
    await test.step('And Alice can search for scheduled leave', async () => {
        await leave.clickSearch();
        await leave.assertResultsGridVisible();
    });

});