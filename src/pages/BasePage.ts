import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}
  
  async goto(url: string) {
    await this.page.goto(url);
  }
  
  async getCartBadgeCount() {
    const cartBadge = this.page.locator('.shopping_cart_badge');
    if (await cartBadge.isVisible()) {
      const text = await cartBadge.textContent() || '0';
      return parseInt(text);
    }
    return 0;
  }
}