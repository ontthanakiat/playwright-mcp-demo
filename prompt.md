Use the Playwright MCP server and follow this case. After finishing steps 1- 14, generate a playwright test script with TypeScript using POM+Fixture and DDT(users, products, etc).
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