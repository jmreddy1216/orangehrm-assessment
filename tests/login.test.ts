import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// Negative scenario: invalid credentials should be rejected with an error,
// not silently fail or reach the dashboard.
test('Scenario: Invalid login shows an error and does not reach the dashboard', async ({ page }) => {
    const login = new LoginPage(page);

    await test.step('Given a user attempts to log in with a wrong password', async () => {
        await page.goto('/');
        await page.fill(login.userNameInput, 'Admin');
        await page.fill(login.passwordInput, 'wrong-password-123');
        await page.click(login.loginButton);
    });

    await test.step('Then an invalid credentials message is shown', async () => {
        await expect(page.locator('.oxd-alert-content-text')).toBeVisible();
        await expect(page.locator('.oxd-alert-content-text')).toHaveText(/Invalid credentials/i);
    });

    await test.step('And the user remains on the login page', async () => {
        await expect(page).toHaveURL(/auth\/login/);
    });
});
