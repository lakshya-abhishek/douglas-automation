import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import testData from '../data/testdata.json';

export class ParfumPage extends BasePage {
  private productTiles = testData.selectors.productTile;
  private filterOption = testData.selectors.filterOption;
  private parfumURL = testData.urls.parfum;

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
    await option.waitFor({ state: 'visible', timeout: 5000 });
  }

  async selectFirstFilterOption() {
    const option = this.page.locator(this.filterOption).first();
    await option.click();
    await expect(this.page.locator(this.productTiles).first()).toBeVisible();
  }

  async getProductCount(): Promise<number> {
    return await this.page.locator(this.productTiles).count();
  }

  async verifyProductsDisplayed(): Promise<boolean> {
    const count = await this.getProductCount();
    return count > 0;
  }

  async verifyParfumPageURL() {
    await this.verifyURL(this.parfumURL);
  }
}