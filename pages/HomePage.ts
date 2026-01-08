import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  private cookieAcceptButton = 'button:has-text("Alle akzeptieren"), button:has-text("Accept")';
  private parfumLink = 'a[href*="parfum"], a:has-text("Parfum")';

  constructor(page: Page) {
    super(page);
  }

  async navigate() {
    await this.page.goto('https://www.douglas.de/de');
  }

  async acceptCookies() {
    const cookieButton = this.page.locator(this.cookieAcceptButton).first();
    if (await cookieButton.isVisible({ timeout: 5000 })) {
      await cookieButton.click();
      await this.page.waitForTimeout(1000);
    }
  }

  async goToParfum() {
    await this.page.locator(this.parfumLink).first().click();
    await this.page.waitForLoadState('networkidle');
  }
}