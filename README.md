# Module 2 Final Quiz

This project simulates an **E-Commerce Administrator System** using JavaScript.   You will complete and test functions that manage products, customers, and orders.


## Requirements
Install `node.js` going to the following link: https://nodejs.org/en/download/ , download the installer, run it and follow the instructions to install.

## Files
- **`ecommerce.js`**  
  Contains all the functions for the assignment and a demo `main()` method.  

- **`check.js`**  
  A Quality Assurance (QA) Testing Script for ecommerce.js
  - ✅ Green = PASS  
  - ❌ Red = FAIL  


## Instructions

### 1. Add Code to the All `Independent and Composite` Functions
Implement Code to those functions in `ecommerce.js` using the specific instruction provided at each. For `placeOrder` you will need to add comments with the JSdoc
style such as in the other functions where it says **TODO**.

### 2. Run the Tests
Run the test file using the terminal from the root of the project to check if all functions work correctly:

```bash
node check.js
```

You will see PASS/FAIL results in the terminal with expected vs actual outputs. `Do NOT continue until ALL function pass.`

Just note `NEVER to Commit any change to JSON Files.`

## Objects in JSON Files
The system loads initial data from the `data/` folder. Each JSON files from that folder loads a group of objects of the following different types:

- **products.json** → List of product objects  
  ```json
  { "id": 1, "name": "Laptop", "price": 1200, "stock": 5 }
  ```
  - `id`: unique identifier  
  - `name`: product name  
  - `price`: product price in USD  
  - `stock`: number of items available  

- **customers.json** → List of customer objects  
  ```json
  { "id": 1, "name": "Alice", "email": "alice@email.com" }
  ```
  - `id`: unique identifier  
  - `name`: customer name  
  - `email`: contact email  

- **orders.json** → List of order objects  
  ```json
  { "orderId": 1, "customerId": 1, "productId": 1, "quantity": 2 }
  ```
  - `orderId`: unique identifier for the order  
  - `customerId`: links to a customer  
  - `productId`: links to a product  
  - `quantity`: number of products purchased  


## Useful Tips
1. Remember to add the return statement when is the case
2. Constantly run the testing and do the expected vs actual results to find the bugs if there are.
3. Read carefully all instructions/comments since there are hidden tips
4. You are only allowed to edit `ecommerce.js`. Do not rename files or move them around.
5. Functions Link: https://www.w3schools.com/js/js_functions.asp
6. If you commited a change to a JSON file please reach out to instructors. Ideally do not change the JSON or revert if done to prevent test crashes or bugs when doing the demo.
7. JSDocs Link: https://medium.com/@martink_rsa/js-docs-a-quickstart-guide-da6ce5df4a73
8. `Function Names and param order should be as described in documentation to prevent errors in testing.`
8. Feel Free to Ask if you have any question.
