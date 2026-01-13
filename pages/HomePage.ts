import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { getFullURL } from '../utils/config';
import testData from '../data/testdata.json';

export class HomePage extends BasePage {
  private cookieAcceptButton = testData.selectors.cookieAccept;
  private parfumLink = testData.selectors.parfumLink;

  constructor(page: Page) {
    super(page);
  }

  async navigate() {
    await this.page.goto(getFullURL());
  }

  async acceptCookies() {
    const cookieButton = this.page.locator(this.cookieAcceptButton).first();
    
    try {
      await cookieButton.waitFor({ state: 'visible', timeout: 10000 });
      await cookieButton.click();      
      await cookieButton.waitFor({ state: 'hidden', timeout: 5000 });
    } catch {
      console.log('Cookie banner not detected');
    }
  }

  async goToParfum() {
    await this.page.locator(this.parfumLink).first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}