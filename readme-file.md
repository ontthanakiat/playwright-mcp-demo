# SauceDemo Test Automation

A comprehensive end-to-end test automation framework for [SauceDemo](https://www.saucedemo.com/) using Playwright with TypeScript. This project implements the Page Object Model (POM) pattern, fixtures, and Data-Driven Testing (DDT) approaches.

## 🚀 Features

- **Page Object Model**: Maintainable and reusable page abstractions
- **TypeScript**: Strong typing for better code quality and IDE support
- **Data-Driven Testing**: Parameterized tests with different users and product combinations
- **Fixtures**: Reusable test context and data
- **Comprehensive Reporting**: Detailed test reports with screenshots and videos

## 📋 Prerequisites

- Node.js (v14 or newer)
- npm (v6 or newer)

## 🛠️ Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/saucedemo-playwright-tests.git
   cd saucedemo-playwright-tests
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## 🧪 Running Tests

### Run all tests

```bash
npm test
```

### Run specific test file

```bash
npx playwright test tests/checkout-flow.spec.ts
```

### Run with specific browser

```bash
npx playwright test --project=chromium
```

### Run in headed mode (with browser UI)

```bash
npx playwright test --headed
```

### Run with debug mode

```bash
npx playwright test --debug
```

## 📊 Test Reports

After test execution, HTML reports are generated in the `results/reports` directory.

To view the last test report:

```bash
npx playwright show-report results/reports
```

## 🏗️ Project Structure

```
📦 saucedemo-playwright-tests
 ┣ 📂 playwright.config.ts
 ┣ 📂 package.json
 ┣ 📂 tsconfig.json
 ┣ 📂 src
 ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📜 base-page.ts
 ┃ ┃ ┣ 📜 login-page.ts
 ┃ ┃ ┣ 📜 inventory-page.ts
 ┃ ┃ ┣ 📜 product-detail-page.ts
 ┃ ┃ ┣ 📜 cart-page.ts
 ┃ ┃ ┣ 📜 checkout-info-page.ts
 ┃ ┃ ┣ 📜 checkout-overview-page.ts
 ┃ ┃ ┗ 📜 checkout-complete-page.ts
 ┃ ┣ 📂 fixtures
 ┃ ┃ ┣ 📜 page-fixtures.ts
 ┃ ┃ ┗ 📜 test-data.ts
 ┃ ┣ 📂 test-data
 ┃ ┃ ┣ 📜 users.json
 ┃ ┃ ┗ 📜 products.json
 ┃ ┗ 📂 utils
 ┃   ┣ 📜 test-helpers.ts
 ┃   ┗ 📜 price-calculator.ts
 ┣ 📂 tests
 ┃ ┣ 📜 checkout-flow.spec.ts
 ┃ ┣ 📜 cart-management.spec.ts
 ┃ ┗ 📜 authentication.spec.ts
 ┗ 📂 results
   ┣ 📂 screenshots
   ┣ 📂 videos
   ┗ 📂 reports
```

## 🧩 Key Components

### Page Objects

Each page in the application has a corresponding page object class that handles all interactions with that page.

```typescript
// Example of inventory-page.ts
export class InventoryPage extends BasePage {
  // Locators
  private productsTitle = this.page.locator('.title');
  private cartLink = this.page.locator('.shopping_cart_link');
  
  // Methods
  async isLoaded() {
    return await this.productsTitle.textContent() === 'Products';
  }
  
  async addToCart(productName: string) {
    const productId = productName.toLowerCase().replace(/\s+/g, '-');
    await this.page.locator(`[data-test="add-to-cart-${productId}"]`).click();
  }
  
  // More methods...
}
```

### Fixtures

Reusable test setups with page objects and test data:

```typescript
// Example of page-fixtures.ts
const testFixtures = test.extend<TestFixture>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  // More fixtures...
});
```

### Data-Driven Tests

Parameterized tests that run with different data sets:

```typescript
// Example from checkout-flow.spec.ts
for (const userData of users) {
  testFixtures(`Should complete checkout process as ${userData.username}`, async ({
    loginPage, 
    inventoryPage,
    // other fixtures...
  }) => {
    // Test steps with current user data
  });
}
```

## 🔍 Test Scenarios

The main test scenarios include:

1. **Authentication**: Login with different user types
2. **Cart Management**: Add/remove items, update quantities
3. **Checkout Flow**: Complete end-to-end purchase flow
   - Add items to cart
   - Navigate to checkout
   - Fill customer information
   - Verify tax calculations
   - Verify total price
   - Complete order

## 🧰 Configuration

### playwright.config.ts

```typescript
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: [
    ['html', { outputFolder: './results/reports' }],
    ['json', { outputFile: './results/reports/test-results.json' }]
  ],
  use: {
    baseURL: 'https://www.saucedemo.com',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
};

export default config;
```

## 📝 Todo and Future Enhancements

- [ ] Add API tests for backend verification
- [ ] Implement visual regression tests
- [ ] Add accessibility testing
- [ ] Set up CI/CD pipeline integration
- [ ] Implement test coverage reporting

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [SauceDemo](https://www.saucedemo.com/) - Demo site for testing
