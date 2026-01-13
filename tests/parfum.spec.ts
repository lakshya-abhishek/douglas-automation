import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Douglas Parfum Basic Tests', () => {

  test('should load homepage and navigate to Parfum', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await homePage.acceptCookies();
    await homePage.verifyHomePageTitle();

    await homePage.goToParfum();
    await homePage.verifyParfumPageLoaded();
  });

});