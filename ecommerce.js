// ========================================
//   E-Commerce Admin System
// ========================================

// ---------- Setup ----------
const fs = require("fs");

// ---------- Load Data from JSON ----------
// Data About Products
let products = JSON.parse(fs.readFileSync("./data/products.json", "utf8"));
// Data About Customers
let customers = JSON.parse(fs.readFileSync("./data/customers.json", "utf8"));
// Data About Orders
let orders = JSON.parse(fs.readFileSync("./data/orders.json", "utf8"));

// ---------- Independent Functions ----------

/**
 * @name addProduct
 * @description Adds a new product object into the products array.
 * @param {Array} products - The array of product objects.
 * @param {Object} newProduct - The new product object to add.
 * @return {Array} The updated products array.
 *
 * TIP: 
 *  - Check for the `push()` function
 */
function addProduct(products, newProduct) {
  products.push(newProduct);
  return products;
}

/**
 * @name removeProduct
 * @description Removes a product by ID from the products array.
 * @param {Array} products - The array of product objects.
 * @param {number} productId - The ID of the product to remove.
 * @return {Array} The updated products array without the removed product.
 *
 * TIP:
 *  - Check for the `filter()` function to just keep the 
 *    IDs that are not the productID parameter
 */
function removeProduct(products, productId) {
  return products.filter(product => product.id !== productId);
}

/**
 * @name findProduct
 * @description Finds a product by its name (case-insensitive) in the products array.
 * @param {Array} products - The array of product objects.
 * @param {string} name - The product name to search for.
 * @return {Object|string} The found product object or a "Product not found" message.
 *
 * TIPS:
 *  - Check the `find()` function to find the match between 
 *    the name of product object and name parameter
 *  - Using `.toLowerCase()` ensures the search is not case-sensitive.
 *    Example: "Laptop" and "laptop" will both work!
 */
function findProduct(products, name) {
  let product = products.find(product => product.name.toLowerCase() === name.toLowerCase());
  
  if(product) {
    return product;
  }else{
    return "Product not found"
  }
}

/**
 * @name updateStock
 * @description Updates the stock of a product by its ID.
 * @param {Array} products - The array of product objects.
 * @param {number} productId - The ID of the product to update.
 * @param {number} quantity - The amount to add (positive) or subtract (negative).
 * @return {Object|string} The updated product object or a "not found" message.
 *
 * TIPS: 
 *  - First use `find()` to find the product by its ID (Similar to findProduct function
 *    but with ID instead of name and without the toLowerCase())
 *  - Then do an if statement to check if product is found. You can use `if(product)`
 *    for your statement. Inside the if put the code to update stock and return Product.
 *    Otherwise return the "Not Found" Message.
 *  - To update stock access the stock variable from the product object (product.stock)
 *    and then add the quantity.
 */
function updateStock (products, productId, quantity) {
  let product = products.find(product => product.id === productId);
  if (product){
    product.stock += quantity;
    return product
  }else{
    return "Product not found"
  }
}

/**
 * This Function is sort of a free question! Just add the documentation accordingly where it says TODO
 * @name placeOrder
 * @description Place an order in the shopping cart
 * @param {Array} customers - The array of customer objects.
 * @param {Array} products - The array of product objects.
 * @param {Array} orders - The array of order objects.
 * @param {number} customerId - The ID of the customer placing the order.
 * @param {number} productId - The ID of the product being ordered.
 * @param {number} quantity - The number of products being ordered.
 * @return {string} That includes name of client, product and quantity.
*/
function placeOrder(customers, products, orders, customerId, productId, quantity) {
  //Find customer and product in the arrays
  let customer = customers.find(c => c.id === customerId);
  let product = products.find(p => p.id === productId);

  //Handle invalid cases (missing customer or product)
  if (!customer || !product) {
    //Return a failure confirmation message
    return "Customer or Product not found";
  }

  //Check stock and quantity before placing the order
  if (product.stock >= quantity && quantity > 0) {
    
    //Update Stock
    product.stock -= quantity;

    // Generate a new unique orderId (find the max ID and add 1)
    let nextOrderId = orders.reduce((max, o) => Math.max(max, o.orderId), 0) + 1;

    //Create the new order object
    let newOrder = {
      orderId: nextOrderId,
      customerId: customer.id,
      productId: product.id,
      quantity: quantity
    };

    //Save the order to the orders array
    orders.push(newOrder);

    //Return a confirmation message
    return `Order placed: ${customer.name} bought ${quantity} x ${product.name}`;
  } else {
    //Return a failure confirmation message
    return "Not enough stock to place order";
  }
}


/**
 * @name listOrders
 * @description Returns the list of orders as a JSON string.
 * @param {Array} orders - The array of order objects.
 * @return {string} The orders array in JSON format.
 *
 * TIP:
 *  - Check `JSON.stringify` function
 * 
 */
function listOrders(orders){
  return JSON.stringify(orders);
}

/**
 * @name loadOrders
 * @description Loads order data from a JSON string.
 * @param {string} jsonString - The JSON string of orders.
 * @return {Array} The parsed array of order objects.
 *
 * TIP:
 *  - Check `JSON.parse` function
 */
function loadOrders(jsonString){
  return JSON.parse(jsonString);
}

/**
 * @name getCustomerOrders
 * @description Returns all orders placed by a specific customer.
 * @param {Array} orders - The array of order objects.
 * @param {number} customerId - The ID of the customer.
 * @return {Array} An array of orders for that customer.
 *
 * TIP:
 *  - Check for the `filter()` function to just keep the 
 *     orders where the ID of them match the expected customerId
 */
function getCustomerOrders(orders, customerId){
  return orders.filter(order=> order.customerId === customerId);
}

// ---------- Composite Functions ----------

/**
 * @name getLowStockProducts
 * @description Returns all products with stock lower than a threshold.
 * @param {Array} products - The array of product objects.
 * @param {number} threshold - The stock threshold.
 * @return {Array} The array of low-stock products.
 *
 * TIP:
 *  - Check for the `filter()` function to just keep the 
 *    products where the stock of them is less than the
 *    threshold stock quantity
 */
function getLowStockProducts(products, threshold){
  return products.filter(product => product.stock < threshold);
}

/**
 * @name generateRestockReport
 * @description Generates a restock report in JSON format for products below a given threshold.
 * @param {Array} products - The array of product objects.
 * @param {number} threshold - The stock threshold. Any product with stock < threshold will appear in the report.
 * @return {string} JSON string containing all low-stock products.
 *
 * 💡 TIPS:
 *  - Reuses the function `getLowStockProducts(products, threshold)` to avoid repeating logic.
 *  - Use `JSON.stringify()` so the result can be easily saved to a file or sent over a network.
 *  - The result is a string, not an array! Use `JSON.parse()` if you need to work with it again.
 */
function generateRestockReport(products, threshold){
  let lowStock = getLowStockProducts(products, threshold);
  return JSON.stringify(lowStock)
}

// ---------- Do NOT MODIFY FOLLOWING FUNCTION ----------

/**
 * @name printRestockReport
 * @description Prints a restock report to the console in a human-friendly format.
 * @param {string} jsonReport - The JSON string produced by generateRestockReport().
 * @return {void} Prints the report directly to the console.
 *
 * 💡 TIPS:
 *  - This function is for readability: managers may prefer plain text over JSON.
 *  - It parses the JSON string back to an array and then formats it neatly.
 *  - You could enhance this further by writing the report to a file instead of console.
 */
function printRestockReport(jsonReport) {
  let report = JSON.parse(jsonReport);

  if (report.length === 0) {
    console.log("All products are sufficiently stocked!");
    return;
  }

  console.log("Restock Report:");
  console.log("----------------------------------");
  report.forEach(p => {
    console.log(`- ${p.name} (ID: ${p.id}) → Stock: ${p.stock}`);
  });
  console.log("----------------------------------");
}


// ---------- Main Simulation ----------

function main() {
  let a=generateRestockReport(products,3);
  printRestockReport(a);
}
main();



// Export only if the function is defined
module.exports = {};
if (typeof addProduct === "function") module.exports.addProduct = addProduct;
if (typeof removeProduct === "function") module.exports.removeProduct = removeProduct;
if (typeof findProduct === "function") module.exports.findProduct = findProduct;
if (typeof updateStock === "function") module.exports.updateStock = updateStock;
if (typeof placeOrder === "function") module.exports.placeOrder = placeOrder;
if (typeof listOrders === "function") module.exports.listOrders = listOrders;
if (typeof loadOrders === "function") module.exports.loadOrders = loadOrders;
if (typeof getCustomerOrders === "function") module.exports.getCustomerOrders = getCustomerOrders;
if (typeof getLowStockProducts === "function") module.exports.getLowStockProducts = getLowStockProducts;
if (typeof generateRestockReport === "function") module.exports.generateRestockReport = generateRestockReport;

