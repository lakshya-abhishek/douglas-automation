import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ParfumPage } from '../pages/ParfumPage';

test.describe('Douglas Parfum Filter Tests', () => {
  let homePage: HomePage;
  let parfumPage: ParfumPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    parfumPage = new ParfumPage(page);

    await homePage.navigate();
    await homePage.acceptCookies();
    await homePage.goToParfum();
  });

  test('should filter products by Sale', async ({ page }) => {
    await parfumPage.applyFilter('Sale');
    const hasProducts = await parfumPage.verifyProductsDisplayed();
    expect(hasProducts).toBeTruthy();
  });

  test('should filter products by Neu', async ({ page }) => {
    await parfumPage.applyFilter('Neu');
    const hasProducts = await parfumPage.verifyProductsDisplayed();
    expect(hasProducts).toBeTruthy();
  });

  test('should filter products by Limitiert', async ({ page }) => {
    await parfumPage.applyFilter('Limitiert');
    const hasProducts = await parfumPage.verifyProductsDisplayed();
    expect(hasProducts).toBeTruthy();
  });

  test('should filter products by brand', async ({ page }) => {
    await parfumPage.expandFilterSection('Marke');
    await parfumPage.selectFirstFilterOption();
    const hasProducts = await parfumPage.verifyProductsDisplayed();
    expect(hasProducts).toBeTruthy();
  });

  test('should filter products by Produktart', async ({ page }) => {
    await parfumPage.expandFilterSection('Produktart');
    await parfumPage.selectFirstFilterOption();
    const hasProducts = await parfumPage.verifyProductsDisplayed();
    expect(hasProducts).toBeTruthy();
  });

});