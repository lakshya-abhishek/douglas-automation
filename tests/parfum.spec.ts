import { test, expect } from '@playwright/test';

test.describe('Douglas Parfum Tests', () => {

  test('should load homepage successfully', async ({ page }) => {
    await page.goto('https://www.douglas.de/de');
    await expect(page).toHaveTitle(/Online-Parfümerie ✔️ Parfum & Kosmetik kaufen | DOUGLAS/);
  });

});