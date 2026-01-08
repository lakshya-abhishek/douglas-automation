import { test, expect } from '@playwright/test';

test.describe('Douglas Parfum Filter Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.douglas.de/de');

    const cookieButton = page.locator('button:has-text("Alle akzeptieren"), button:has-text("Accept")').first();
    if (await cookieButton.isVisible({ timeout: 5000 })) {
      await cookieButton.click();
      await page.waitForTimeout(1000);
    }

    const parfumLink = page.locator('a[href*="parfum"], a:has-text("Parfum")').first();
    await parfumLink.click();
    await page.waitForLoadState('networkidle');
  });

  test('should filter products by Sale', async ({ page }) => {
    const saleFilter = page.locator('text=Sale').first();
    await saleFilter.click();
    await page.waitForTimeout(2000);

    const productCount = await page.locator('[data-testid="product-tile"], .product-item, .product').count();
    expect(productCount).toBeGreaterThan(0);
  });

  test('should filter products by Neu', async ({ page }) => {
    const neuFilter = page.locator('text=Neu').first();
    await neuFilter.click();
    await page.waitForTimeout(2000);

    const productCount = await page.locator('[data-testid="product-tile"], .product-item, .product').count();
    expect(productCount).toBeGreaterThan(0);
  });

  test('should filter products by Limitiert', async ({ page }) => {
    const limitiertFilter = page.locator('text=Limitiert').first();
    await limitiertFilter.click();
    await page.waitForTimeout(2000);

    const productCount = await page.locator('[data-testid="product-tile"], .product-item, .product').count();
    expect(productCount).toBeGreaterThan(0);
  });

  test('should filter products by brand', async ({ page }) => {
    const markeSection = page.locator('text=Marke').first();
    await markeSection.click();
    await page.waitForTimeout(1000);

    const firstBrand = page.locator('[data-testid="filter-option"], .facet-option').first();
    await firstBrand.click();
    await page.waitForTimeout(2000);

    const productCount = await page.locator('[data-testid="product-tile"], .product-item, .product').count();
    expect(productCount).toBeGreaterThan(0);
  });

  test('should filter products by Produktart', async ({ page }) => {
    const produktartSection = page.locator('text=Produktart').first();
    await produktartSection.click();
    await page.waitForTimeout(1000);

    const firstType = page.locator('[data-testid="filter-option"], .facet-option').first();
    await firstType.click();
    await page.waitForTimeout(2000);

    const productCount = await page.locator('[data-testid="product-tile"], .product-item, .product').count();
    expect(productCount).toBeGreaterThan(0);
  });

});