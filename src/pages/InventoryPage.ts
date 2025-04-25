import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  private productsTitle = this.page.locator('.title');
  private cartLink = this.page.locator('.shopping_cart_link');
  
  constructor(page: Page) {
    super(page);
  }
  
  async isLoaded() {
    return await this.productsTitle.textContent() === 'Products';
  }
  
  async addToCart(productName: string) {
    const productId = productName.toLowerCase().replace(/\s+/g, '-');
    await this.page.locator(`[data-test="add-to-cart-${productId}"]`).click();
  }
  
  async clickOnProduct(productName: string) {
    await this.page.locator(`text="${productName}"`).first().click();
  }
  
  async navigateToCart() {
    await this.cartLink.click();
  }
}