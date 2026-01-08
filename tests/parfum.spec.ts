import { test, expect } from '@playwright/test';

test.describe('Douglas Parfum Tests', () => {

  test('should load homepage successfully', async ({ page }) => {
    await page.goto('https://www.douglas.de/de');
    await expect(page).toHaveTitle(/Parfüm & Düfte ✔️ online kaufen » für Sie & Ihn | DOUGLAS/);
  });

  test('should handle cookie consent', async ({ page }) => {
    await page.goto('https://www.douglas.de/de');

    const cookieButton = page.locator('button:has-text("Alle akzeptieren"), button:has-text("Accept")').first();
    if (await cookieButton.isVisible({ timeout: 5000 })) {
      await cookieButton.click();
    }

    await expect(cookieButton).not.toBeVisible();
  });

});