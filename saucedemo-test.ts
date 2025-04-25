// POM - Page Objects

// Base Page class that all page objects inherit from
class BasePage {
  constructor(protected page: any) {}
  
  async goto(url: string) {
    await this.page.goto(url);
  }
  
  async getCartBadgeCount() {
    const cartBadge = this.page.locator('.shopping_cart_badge');
    if (await cartBadge.isVisible()) {
      return parseInt(await cartBadge.textContent());
    }
    return 0;
  }
}

// Login Page
class LoginPage extends BasePage {
  private usernameField = this.page.locator('[data-test="username"]');
  private passwordField = this.page.locator('[data-test="password"]');
  private loginButton = this.page.locator('[data-test="login-button"]');
  
  constructor(page: any) {
    super(page);
  }
  
  async navigate() {
    await this.goto('https://www.saucedemo.com/');
  }
  
  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}

// Inventory Page (Products List)
class InventoryPage extends BasePage {
  private productsTitle = this.page.locator('.title');
  private cartLink = this.page.locator('.shopping_cart_link');
  
  constructor(page: any) {
    super(page);
  }
  
  async isLoaded() {
    return await this.productsTitle.textContent() === 'Products';
  }
  
  async addToCart(productName: string) {
    // Convert product name to lowercase and replace spaces with hyphens
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

// Product Detail Page
class ProductDetailPage extends BasePage {
  private addToCartButton = this.page.locator('[data-test="add-to-cart"]');
  private removeButton = this.page.locator('[data-test="remove"]');
  private backButton = this.page.locator('[data-test="back-to-products"]');
  
  constructor(page: any) {
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

// Cart Page
class CartPage extends BasePage {
  private checkoutButton = this.page.locator('[data-test="checkout"]');
  private continueShoppingButton = this.page.locator('[data-test="continue-shopping"]');
  
  constructor(page: any) {
    super(page);
  }
  
  async getItemCount() {
    const cartItems = this.page.locator('.cart_item');
    return await cartItems.count();
  }
  
  async getItemQuantity(productName: string) {
    const productRow = this.page.locator(`.cart_item:has-text("${productName}")`);
    const quantityText = await productRow.locator('.cart_quantity').textContent();
    return parseInt(quantityText);
  }
  
  async removeItem(productName: string) {
    // Convert product name to lowercase and replace spaces with hyphens
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

// Checkout Information Page
class CheckoutInfoPage extends BasePage {
  private firstNameField = this.page.locator('[data-test="firstName"]');
  private lastNameField = this.page.locator('[data-test="lastName"]');
  private postalCodeField = this.page.locator('[data-test="postalCode"]');
  private continueButton = this.page.locator('[data-test="continue"]');
  private cancelButton = this.page.locator('[data-test="cancel"]');
  
  constructor(page: any) {
    super(page);
  }
  
  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.postalCodeField.fill(postalCode);
  }
  
  async continue() {
    await this.continueButton.click();
  }
  
  async cancel() {
    await this.cancelButton.click();
  }
}

// Checkout Overview Page
class CheckoutOverviewPage extends BasePage {
  private finishButton = this.page.locator('[data-test="finish"]');
  private cancelButton = this.page.locator('[data-test="cancel"]');
  
  constructor(page: any) {
    super(page);
  }
  
  async getItemTotal() {
    const subtotalText = await this.page.locator('.summary_subtotal_label').textContent();
    return this.extractPrice(subtotalText);
  }
  
  async getTaxAmount() {
    const taxText = await this.page.locator('.summary_tax_label').textContent();
    return this.extractPrice(taxText);
  }
  
  async getTotal() {
    const totalText = await this.page.locator('.summary_total_label').textContent();
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

// Checkout Complete Page
class CheckoutCompletePage extends BasePage {
  private headerText = this.page.locator('.complete-header');
  private backHomeButton = this.page.locator('[data-test="back-to-products"]');
  
  constructor(page: any) {
    super(page);
  }
  
  async getConfirmationMessage() {
    return await this.headerText.textContent();
  }
  
  async backToHome() {
    await this.backHomeButton.click();
  }
}

// Fixtures - Test data and setup
type TestFixture = {
  page: any;
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  productDetailPage: ProductDetailPage;
  cartPage: CartPage;
  checkoutInfoPage: CheckoutInfoPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  checkoutCompletePage: CheckoutCompletePage;
  user: {
    username: string;
    password: string;
  };
  userInfo: {
    firstName: string;
    lastName: string;
    postalCode: string;
  };
  products: string[];
};

// Test script with DDT
import { test, expect } from '@playwright/test';

// Test Data
const users = [
  { username: 'standard_user', password: 'secret_sauce' },
  { username: 'performance_glitch_user', password: 'secret_sauce' }
];

const products = [
  { name: 'Sauce Labs Fleece Jacket', price: 49.99 },
  { name: 'Test.allTheThings() T-Shirt (Red)', price: 15.99 },
  { name: 'Sauce Labs Backpack', price: 29.99 }
];

const userInfo = {
  firstName: 'ont',
  lastName: 'eiei',
  postalCode: '9999'
};

// Create a test fixture with page objects
const testFixtures = test.extend<TestFixture>({
  // Initialize page objects
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutInfoPage: async ({ page }, use) => {
    await use(new CheckoutInfoPage(page));
  },
  checkoutOverviewPage: async ({ page }, use) => {
    await use(new CheckoutOverviewPage(page));
  },
  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },
  // Default data
  user: async ({}, use) => {
    await use(users[0]); // Using standard_user by default
  },
  userInfo: async ({}, use) => {
    await use(userInfo);
  },
  products: async ({}, use) => {
    await use(products.map(p => p.name));
  }
});

// Main test suite
testFixtures.describe('Sauce Demo E2E Test', () => {
  testFixtures('Should complete checkout process with multiple items', async ({
    loginPage, 
    inventoryPage, 
    productDetailPage, 
    cartPage, 
    checkoutInfoPage,
    checkoutOverviewPage,
    checkoutCompletePage,
    user,
    userInfo,
  }) => {
    // Step 1: Open https://www.saucedemo.com/
    await loginPage.navigate();
    
    // Step 2: Log in with standard user
    await loginPage.login(user.username, user.password);
    await expect(inventoryPage.isLoaded()).resolves.toBeTruthy();
    
    // Step 3: Add Jacket to cart and verify cart count
    await inventoryPage.addToCart('Sauce Labs Fleece Jacket');
    expect(await inventoryPage.getCartBadgeCount()).toBe(1);
    
    // Step 4: Click on the red t-shirt and add it to the cart
    await inventoryPage.clickOnProduct('Test.allTheThings() T-Shirt (Red)');
    await productDetailPage.addToCart();
    expect(await productDetailPage.getCartBadgeCount()).toBe(2);
    
    // Step 5: Click on the cart
    await inventoryPage.navigateToCart();
    
    // Step 6: Continue shopping and add backpack
    await cartPage.continueShopping();
    await inventoryPage.addToCart('Sauce Labs Backpack');
    expect(await inventoryPage.getCartBadgeCount()).toBe(3);
    
    // Step 7: Click on the cart and check items
    await inventoryPage.navigateToCart();
    expect(await cartPage.getItemCount()).toBe(3);
    expect(await cartPage.verifyItemInCart('Sauce Labs Fleece Jacket')).toBeTruthy();
    expect(await cartPage.verifyItemInCart('Test.allTheThings() T-Shirt (Red)')).toBeTruthy();
    expect(await cartPage.verifyItemInCart('Sauce Labs Backpack')).toBeTruthy();
    
    // Step 8: Remove Jacket and verify cart
    await cartPage.removeItem('Sauce Labs Fleece Jacket');
    expect(await cartPage.getItemCount()).toBe(2);
    expect(await cartPage.getCartBadgeCount()).toBe(2);
    
    // Step 9: Click checkout button
    await cartPage.checkout();
    
    // Step 10-11: Enter information and continue
    await checkoutInfoPage.fillInformation(userInfo.firstName, userInfo.lastName, userInfo.postalCode);
    await checkoutInfoPage.continue();
    
    // Step 12-13: Verify tax calculation and total price
    const itemTotal = await checkoutOverviewPage.getItemTotal();
    const tax = await checkoutOverviewPage.getTaxAmount();
    const total = await checkoutOverviewPage.getTotal();
    
    // Calculating expected values
    const expectedItemTotal = 15.99 + 29.99; // T-shirt + Backpack
    const expectedTax = Math.round(expectedItemTotal * 0.08 * 100) / 100; // 8% tax rounded to 2 decimal places
    const expectedTotal = expectedItemTotal + expectedTax;
    
    // Verifying calculations
    expect(itemTotal).toBeCloseTo(expectedItemTotal, 2);
    expect(tax).toBeCloseTo(expectedTax, 2);
    expect(total).toBeCloseTo(expectedTotal, 2);
    
    // Verify tax is exactly 8% of item total
    expect(tax).toBeCloseTo(itemTotal * 0.08, 2);
    
    // Step 14: Click Finish button
    await checkoutOverviewPage.finish();
    
    // Verify order confirmation
    const confirmationMessage = await checkoutCompletePage.getConfirmationMessage();
    expect(confirmationMessage).toContain('Thank you for your order');
  });
});

// Data-driven tests with different users
// This demonstrates how to run the same test with different data
for (const userData of users) {
  testFixtures(`Should complete checkout process as ${userData.username}`, async ({
    loginPage, 
    inventoryPage, 
    productDetailPage, 
    cartPage, 
    checkoutInfoPage,
    checkoutOverviewPage,
    checkoutCompletePage,
    userInfo,
  }) => {
    // Step 1: Open https://www.saucedemo.com/
    await loginPage.navigate();
    
    // Step 2: Log in with the current user from the data set
    await loginPage.login(userData.username, userData.password);
    await expect(inventoryPage.isLoaded()).resolves.toBeTruthy();
    
    // Rest of the test follows the same pattern as above
    // ... (repeat the same test steps but with the current user)
    
    // Step 3: Add Jacket to cart and verify cart count
    await inventoryPage.addToCart('Sauce Labs Fleece Jacket');
    expect(await inventoryPage.getCartBadgeCount()).toBe(1);
    
    // Add the remaining test steps...
    // (This would be a full implementation in a real test)
  });
}

// Example of parametrized test with different products
const productSets = [
  ['Sauce Labs Fleece Jacket', 'Test.allTheThings() T-Shirt (Red)', 'Sauce Labs Backpack'],
  ['Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt', 'Sauce Labs Onesie']
];

for (const productSet of productSets) {
  testFixtures(`Should complete checkout with product set: ${productSet.join(', ')}`, async ({
    page, 
    loginPage, 
    inventoryPage,
    // other page objects...
    user,
    userInfo,
  }) => {
    // This demonstrates how to run tests with different product combinations
    // Implementation would follow the same pattern as the main test
    // but would use the specific products from the current productSet
    
    await loginPage.navigate();
    await loginPage.login(user.username, user.password);
    
    // Add the products from the current set
    for (const product of productSet) {
      await inventoryPage.addToCart(product);
    }
    
    // Verify cart count matches the number of products in the set
    expect(await inventoryPage.getCartBadgeCount()).toBe(productSet.length);
    
    // ... rest of the test steps
  });
}
