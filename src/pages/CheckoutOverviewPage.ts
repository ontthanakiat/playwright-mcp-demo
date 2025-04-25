import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutOverviewPage extends BasePage {
  private finishButton = this.page.locator('[data-test="finish"]');
  private cancelButton = this.page.locator('[data-test="cancel"]');
  
  constructor(page: Page) {
    super(page);
  }
  
  async getItemTotal() {
    const subtotalText = await this.page.locator('.summary_subtotal_label').textContent() || '$0.00';
    return this.extractPrice(subtotalText);
  }
  
  async getTaxAmount() {
    const taxText = await this.page.locator('.summary_tax_label').textContent() || '$0.00';
    return this.extractPrice(taxText);
  }
  
  async getTotal() {
    const totalText = await this.page.locator('.summary_total_label').textContent() || '$0.00';
    return this.extractPrice(totalText);
  }
  
  private extractPrice(text: string) {
    const priceMatch = text.match(/\$(\d+\.\d+)/);
    if (priceMatch) {
      return parseFloat(priceMatch[1]);
    }
    return 0;
  }
  
  async finish() {
    await this.finishButton.click();
  }
  
  async cancel() {
    await this.cancelButton.click();
  }
}