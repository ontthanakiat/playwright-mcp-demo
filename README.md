# Sauce Demo E2E Test Automation

This project contains end-to-end tests for the Sauce Demo website using Playwright with TypeScript, following the Page Object Model pattern and Data-Driven Testing approach.

## Project Structure

```
src/
  ├── pages/         # Page Object Model classes
  ├── fixtures/      # Test fixtures
  ├── test-data/     # Test data
  └── utils/         # Utility functions
tests/
  └── saucedemo.spec.ts  # Test specifications
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run tests:
```bash
npx playwright test
```

## Test Cases

- Complete checkout process with multiple items
- Data-driven tests with different user types
- Parameterized tests with different product sets

## Features

- Page Object Model (POM) implementation
- Test fixtures for better test organization
- Data-Driven Testing (DDT) approach
- Automated tax and total price verification
- HTML test reports