import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
  private addToCartButton = this.page.locator('[data-test="add-to-cart"]');
  private removeButton = this.page.locator('[data-test="remove"]');
  private backButton = this.page.locator('[data-test="back-to-products"]');
  
  constructor(page: Page) {
    super(page);
  }
  
  async addToCart() {
    await this.addToCartButton.click();
  }
  
  async removeFromCart() {
    await this.removeButton.click();
  }
  
  async returnToProducts() {
    await this.backButton.click();
  }
}