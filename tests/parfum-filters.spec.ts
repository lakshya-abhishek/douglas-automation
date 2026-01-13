import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ParfumPage } from '../pages/ParfumPage';
import filtersData from '../data/filters.json';
import { logger } from '../utils/logger';

test.describe('Douglas Parfum Data-Driven Filter Tests', () => {
  let homePage: HomePage;
  let parfumPage: ParfumPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    parfumPage = new ParfumPage(page);

    logger.info('Starting test setup');
    await homePage.navigate();
    await homePage.acceptCookies();
    await homePage.goToParfum();
    await parfumPage.verifyParfumPageURL();
    logger.info('Test setup completed');
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== 'passed') {
      logger.error(`Test failed: ${testInfo.title}`);
      const screenshot = await page.screenshot();
      await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
    }
  });

  filtersData.highlights.forEach((filter) => {
    if (filter.enabled) {
      test(`should filter products by ${filter.name}`, async ({ page }) => {
        logger.info(`Applying filter: ${filter.name}`);
        await parfumPage.applyFilter(filter.name);
        const hasProducts = await parfumPage.verifyProductsDisplayed();
        expect(hasProducts).toBeTruthy();
        logger.info(`Filter ${filter.name} applied successfully`);
      });
    }
  });

  test('should filter products by brand from data', async ({ page }) => {
    logger.info('Testing brand filter');
    await parfumPage.expandFilterSection(filtersData.categories.marke.label);
    await parfumPage.selectFirstFilterOption();
    const hasProducts = await parfumPage.verifyProductsDisplayed();
    expect(hasProducts).toBeTruthy();
  });

  test('should filter products by Produktart from data', async ({ page }) => {
    logger.info('Testing Produktart filter');
    await parfumPage.expandFilterSection(filtersData.categories.produktart.label);
    await parfumPage.selectFirstFilterOption();
    const hasProducts = await parfumPage.verifyProductsDisplayed();
    expect(hasProducts).toBeTruthy();
  });

});