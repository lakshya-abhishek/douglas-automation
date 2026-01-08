import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Douglas Parfum Basic Tests', () => {

  test('should load homepage and navigate to Parfum', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await homePage.acceptCookies();
    await expect(page).toHaveTitle(/Douglas/);

    await homePage.goToParfum();
    await expect(page).toHaveURL(/parfum/);
  });

});