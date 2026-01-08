import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ParfumPage extends BasePage {
  private productTiles = '[data-testid="product-tile"], .product-item, .product';
  private filterBase = 'text=';

  constructor(page: Page) {
    super(page);
  }

  async applyFilter(filterName: string) {
    const filter = this.page.locator(`${this.filterBase}${filterName}`).first();
    await filter.click();
    await this.page.waitForTimeout(2000);
  }

  async expandFilterSection(sectionName: string) {
    const section = this.page.locator(`text=${sectionName}`).first();
    await section.click();
    await this.page.waitForTimeout(1000);
  }

  async selectFirstFilterOption() {
    const option = this.page.locator('[data-testid="filter-option"], .facet-option').first();
    await option.click();
    await this.page.waitForTimeout(2000);
  }

  async getProductCount(): Promise<number> {
    return await this.page.locator(this.productTiles).count();
  }

  async verifyProductsDisplayed() {
    const count = await this.getProductCount();
    return count > 0;
  }
}