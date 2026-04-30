import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LeavePage } from '../pages/LeavePage'; 

test('Scenario: Search for scheduled leave', async ({ page }) => {
    const login = new LoginPage(page);
    const leave = new LeavePage(page); 

    await test.step('Given Alice logs into OrangeHR', async () => {
        await login.login(process.env.ORANGEHR_USERNAME!, process.env.ORANGEHR_PASSWORD!);
    });

    await test.step('When Alice navigates to Leave', async () => {
        
        await leave.navigateToLeaveList();
    });

    await test.step('Then Alice can set a date range', async () => {
        
        await leave.setDateRange('2024-01-01', '2024-12-31');
    });
    
    await test.step('And Alice can search for scheduled leave', async () => {
        
        await leave.clickSearch();
        await leave.assertResultsGridVisible();
    }); 
    
});