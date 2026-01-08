import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ParfumPage } from '../pages/ParfumPage';
import filtersData from '../data/filters.json';

test.describe('Douglas Parfum Data-Driven Filter Tests', () => {
  let homePage: HomePage;
  let parfumPage: ParfumPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    parfumPage = new ParfumPage(page);

    await homePage.navigate();
    await homePage.acceptCookies();
    await homePage.goToParfum();
  });

  filtersData.highlights.forEach((filter) => {
    if (filter.enabled) {
      test(`should filter products by ${filter.name}`, async ({ page }) => {
        await parfumPage.applyFilter(filter.name);
        const hasProducts = await parfumPage.verifyProductsDisplayed();
        expect(hasProducts).toBeTruthy();
      });
    }
  });

  test('should filter products by brand from data', async ({ page }) => {
    await parfumPage.expandFilterSection(filtersData.categories.marke.label);
    await parfumPage.selectFirstFilterOption();
    const hasProducts = await parfumPage.verifyProductsDisplayed();
    expect(hasProducts).toBeTruthy();
  });

  test('should filter products by Produktart from data', async ({ page }) => {
    await parfumPage.expandFilterSection(filtersData.categories.produktart.label);
    await parfumPage.selectFirstFilterOption();
    const hasProducts = await parfumPage.verifyProductsDisplayed();
    expect(hasProducts).toBeTruthy();
  });

});