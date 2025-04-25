import { expect } from '@playwright/test';
import { test } from '../src/fixtures/testFixtures';
import { users, productSets } from '../src/test-data/testData';

test.describe('Sauce Demo E2E Test', () => {
  test('Should complete checkout process with multiple items', async ({
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
    await loginPage.navigate();
    await loginPage.login(user.username, user.password);
    await expect(inventoryPage.isLoaded()).resolves.toBeTruthy();
    
    await inventoryPage.addToCart('Sauce Labs Fleece Jacket');
    expect(await inventoryPage.getCartBadgeCount()).toBe(1);
    
    await inventoryPage.clickOnProduct('Test.allTheThings() T-Shirt (Red)');
    await productDetailPage.addToCart();
    expect(await productDetailPage.getCartBadgeCount()).toBe(2);
    
    await inventoryPage.navigateToCart();
    await cartPage.continueShopping();
    await inventoryPage.addToCart('Sauce Labs Backpack');
    expect(await inventoryPage.getCartBadgeCount()).toBe(3);
    
    await inventoryPage.navigateToCart();
    expect(await cartPage.getItemCount()).toBe(3);
    expect(await cartPage.verifyItemInCart('Sauce Labs Fleece Jacket')).toBeTruthy();
    expect(await cartPage.verifyItemInCart('Test.allTheThings() T-Shirt (Red)')).toBeTruthy();
    expect(await cartPage.verifyItemInCart('Sauce Labs Backpack')).toBeTruthy();
    
    await cartPage.removeItem('Sauce Labs Fleece Jacket');
    expect(await cartPage.getItemCount()).toBe(2);
    expect(await cartPage.getCartBadgeCount()).toBe(2);
    
    await cartPage.checkout();
    
    await checkoutInfoPage.fillInformation(userInfo.firstName, userInfo.lastName, userInfo.postalCode);
    await checkoutInfoPage.continue();
    
    const itemTotal = await checkoutOverviewPage.getItemTotal();
    const tax = await checkoutOverviewPage.getTaxAmount();
    const total = await checkoutOverviewPage.getTotal();
    
    const expectedItemTotal = 15.99 + 29.99; // T-shirt + Backpack
    const expectedTax = Math.round(expectedItemTotal * 0.08 * 100) / 100;
    const expectedTotal = expectedItemTotal + expectedTax;
    
    expect(itemTotal).toBeCloseTo(expectedItemTotal, 2);
    expect(tax).toBeCloseTo(expectedTax, 2);
    expect(total).toBeCloseTo(expectedTotal, 2);
    expect(tax).toBeCloseTo(itemTotal * 0.08, 2);
    
    await checkoutOverviewPage.finish();
    
    const confirmationMessage = await checkoutCompletePage.getConfirmationMessage();
    expect(confirmationMessage).toContain('Thank you for your order');
  });
});

// Data-driven tests with different users
for (const userData of users) {
  test(`Should complete checkout process as ${userData.username}`, async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutInfoPage,
    checkoutOverviewPage,
    checkoutCompletePage,
    userInfo,
  }) => {
    await loginPage.navigate();
    await loginPage.login(userData.username, userData.password);
    await expect(inventoryPage.isLoaded()).resolves.toBeTruthy();
    
    await inventoryPage.addToCart('Sauce Labs Backpack');
    expect(await inventoryPage.getCartBadgeCount()).toBe(1);
    
    await inventoryPage.navigateToCart();
    await cartPage.checkout();
    
    await checkoutInfoPage.fillInformation(userInfo.firstName, userInfo.lastName, userInfo.postalCode);
    await checkoutInfoPage.continue();
    await checkoutOverviewPage.finish();
    
    const confirmationMessage = await checkoutCompletePage.getConfirmationMessage();
    expect(confirmationMessage).toContain('Thank you for your order');
  });
}

// Test with different product sets
for (const productSet of productSets) {
  test(`Should complete checkout with product set: ${productSet.join(', ')}`, async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutInfoPage,
    checkoutOverviewPage,
    checkoutCompletePage,
    user,
    userInfo,
  }) => {
    await loginPage.navigate();
    await loginPage.login(user.username, user.password);
    
    for (const product of productSet) {
      await inventoryPage.addToCart(product);
    }
    
    expect(await inventoryPage.getCartBadgeCount()).toBe(productSet.length);
    
    await inventoryPage.navigateToCart();
    await cartPage.checkout();
    
    await checkoutInfoPage.fillInformation(userInfo.firstName, userInfo.lastName, userInfo.postalCode);
    await checkoutInfoPage.continue();
    await checkoutOverviewPage.finish();
    
    const confirmationMessage = await checkoutCompletePage.getConfirmationMessage();
    expect(confirmationMessage).toContain('Thank you for your order');
  });
}