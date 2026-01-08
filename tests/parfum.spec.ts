import { test, expect } from '@playwright/test';

test.describe('Douglas Parfum Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.douglas.de/de');

    const cookieButton = page.locator('button:has-text("Alle akzeptieren"), button:has-text("Accept")').first();
    if (await cookieButton.isVisible({ timeout: 5000 })) {
      await cookieButton.click();
    }
  });

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Douglas/);
  });

  test('should handle cookie consent', async ({ page }) => {
    const cookieButton = page.locator('button:has-text("Alle akzeptieren")').first();
    await expect(cookieButton).not.toBeVisible();
  });

  test('should navigate to Parfum section', async ({ page }) => {
    const parfumLink = page.locator('a[href*="parfum"], a:has-text("Parfum")').first();
    await parfumLink.click();

    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/parfum/);
  });

});