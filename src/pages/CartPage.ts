import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private checkoutButton = this.page.locator('[data-test="checkout"]');
  private continueShoppingButton = this.page.locator('[data-test="continue-shopping"]');
  
  constructor(page: Page) {
    super(page);
  }
  
  async getItemCount() {
    const cartItems = this.page.locator('.cart_item');
    return await cartItems.count();
  }
  
  async getItemQuantity(productName: string) {
    const productRow = this.page.locator(`.cart_item:has-text("${productName}")`);
    const quantityText = await productRow.locator('.cart_quantity').textContent() || '0';
    return parseInt(quantityText);
  }
  
  async removeItem(productName: string) {
    const productId = productName.toLowerCase().replace(/\s+/g, '-');
    await this.page.locator(`[data-test="remove-${productId}"]`).click();
  }
  
  async checkout() {
    await this.checkoutButton.click();
  }
  
  async continueShopping() {
    await this.continueShoppingButton.click();
  }
  
  async verifyItemInCart(productName: string) {
    const item = this.page.locator(`.cart_item:has-text("${productName}")`);
    return await item.isVisible();
  }
}