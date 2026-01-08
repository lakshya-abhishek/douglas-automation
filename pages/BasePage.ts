import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async waitForElement(selector: string, timeout = 5000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  async clickElement(selector: string) {
    await this.page.locator(selector).click();
  }

  async getElementText(selector: string): Promise<string> {
    return await this.page.locator(selector).textContent() || '';
  }

  // Check if element is visible within timeout
  async isElementVisible(selector: string, timeout = 5000): Promise<boolean> {
    try {
      await this.page.waitForSelector(selector, { timeout, state: 'visible' });
      return true;
    } catch {
      return false;
    }
  }
}