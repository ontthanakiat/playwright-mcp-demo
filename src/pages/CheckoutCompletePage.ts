import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutCompletePage extends BasePage {
  private headerText = this.page.locator('.complete-header');
  private backHomeButton = this.page.locator('[data-test="back-to-products"]');
  
  constructor(page: Page) {
    super(page);
  }
  
  async getConfirmationMessage() {
    return await this.headerText.textContent();
  }
  
  async backToHome() {
    await this.backHomeButton.click();
  }
}