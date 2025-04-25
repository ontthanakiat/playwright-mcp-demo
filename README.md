# Sauce Demo E2E Test Automation

This project demonstrates end-to-end testing of the Sauce Demo e-commerce website using Playwright with TypeScript. It showcases best practices in test automation including Page Object Model (POM), Test Fixtures, and Data-Driven Testing (DDT) approaches.

## Features

- **Page Object Model (POM)** - Organized test architecture separating page elements and actions
- **Test Fixtures** - Reusable test context and setup
- **Data-Driven Testing** - Parameterized tests with different users and product sets
- **Automated Validations** 
  - Cart management and updates
  - Tax calculations (8% of item total)
  - Total price verification
  - Order confirmation
- **HTML Test Reports** - Detailed test execution reports

## Project Structure

```
src/
  ├── pages/           # Page Object Model classes
  │   ├── BasePage.ts
  │   ├── LoginPage.ts
  │   ├── InventoryPage.ts
  │   ├── ProductDetailPage.ts
  │   ├── CartPage.ts
  │   ├── CheckoutInfoPage.ts
  │   ├── CheckoutOverviewPage.ts
  │   └── CheckoutCompletePage.ts
  ├── fixtures/       # Test fixtures for setup
  ├── test-data/      # Test data (users, products)
  └── utils/          # Utility functions
tests/
  └── saucedemo.spec.ts  # Test specifications
```

## Test Scenarios

1. **Complete E2E Checkout Flow**
   - Login with standard user
   - Add multiple items to cart
   - Verify cart updates
   - Complete checkout process
   - Validate tax and total calculations

2. **User-Based Tests**
   - Tests with different user types
   - standard_user
   - performance_glitch_user

3. **Product-Based Tests**
   - Tests with different product combinations
   - Multiple product sets testing

## Setup and Running Tests

1. Install dependencies:
```bash
npm install
```

2. Run tests:
```bash
npx playwright test
```

3. View test report:
```bash
npx playwright show-report test-report
```

## Test Steps (E2E Flow)

1. Open https://www.saucedemo.com/
2. Log in with standard user
3. Add Jacket to cart and verify cart update
4. Add Red T-shirt through product detail page
5. Navigate to cart
6. Add Backpack through continue shopping flow
7. Verify cart items (3 items)
8. Remove Jacket and verify cart update (2 items)
9. Proceed to checkout
10. Enter shipping information
11. Verify tax calculation (8% of item total)
12. Verify total price
13. Complete order
14. Verify confirmation

## Claude + Playwright MCP Server Prompt

This project was created using Claude AI with the following prompt:

\`\`\`markdown
Use the Playwright MCP server and follow this case. Generate a playwright test script with TypeScript using POM+Fixture and DDT(users, products, etc).

1. Open https://www.saucedemo.com/
2. Log in with standard user
3. Add the Jacket to the cart and make sure the cart is updated
4. Click on the red t-shirt and add it to the cart, then make sure the cart is updated
5. Click on the cart
6. Click Continue shopping and add backpack
7. Click on the cart and check the qty and added items (should be 3 items)
8. Remove the Jacket and verify the cart (should be 2 items)
9. Click the checkout button
10. enter information
   - first name: ont
   - last name: eiei
   - zipcode: 9999
11. Click continue button
12. Verify tax calculation (8% of item total)
13. Verify the total price
14. Click the Finish button
\`\`\`

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Playwright Test Runner
- HTML Reporter

## Best Practices Implemented

1. **Page Object Model**
   - Encapsulated page elements and actions
   - Reusable page methods
   - Maintainable locator strategies

2. **Test Data Management**
   - Separated test data from test logic
   - Configurable user credentials and product data
   - Support for multiple test scenarios

3. **Test Structure**
   - Clear test organization
   - Descriptive test names
   - Step-by-step verification
   - Proper assertion messages

4. **Error Handling**
   - Null checks for element content
   - Proper async/await usage
   - Reliable element waiting strategies

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request