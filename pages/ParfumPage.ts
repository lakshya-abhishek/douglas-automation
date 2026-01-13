import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import testData from '../data/testdata.json';
import { expect } from '@playwright/test';

export class ParfumPage extends BasePage {
  private productTiles = testData.selectors.productTile;
  private filterOption = testData.selectors.filterOption;

  constructor(page: Page) {
    super(page);
  }

  async applyFilter(filterName: string) {
    const filter = this.page.locator(`text=${filterName}`).first();
    await filter.click();
    await this.page.waitForLoadState('load');
  }

  async expandFilterSection(sectionName: string) {
    const section = this.page.locator(`text=/^${sectionName}$/`).first();
    await section.click();
    const option = this.page.locator(this.filterOption).first();
    await option.waitFor({ state: 'visible', timeout: testData.waits.medium });
  }

  async selectFirstFilterOption() {
    const option = this.page.locator(this.filterOption).first();
    await option.click();
    await expect(this.page.locator('[data-testid="product-tile"]').first()).toBeVisible();
  }

  async getProductCount(): Promise<number> {
    return await this.page.locator(this.productTiles).count();
  }

  async verifyProductsDisplayed() {
    const count = await this.getProductCount();
    return count > 0;
  }
}