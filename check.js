const assert = require("assert");
const fs = require("fs");

// Load module as an object instead of destructuring
const ecommerce = require("./ecommerce");

// ANSI escape codes for colors
const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

// Load fresh data for testing
let products = JSON.parse(fs.readFileSync("./data/products.json", "utf8"));
let customers = JSON.parse(fs.readFileSync("./data/customers.json", "utf8"));
let orders = [];

function divider(name) {
  console.log(`${GREEN}--- Testing ${name} ---${RESET}`);
}

// ---------- Tests ----------
try {
  // addProduct
  if (typeof ecommerce.addProduct === "function") {
    divider("addProduct");
    ecommerce.addProduct(products, { id: 100, name: "Test Item", price: 10, stock: 1 });
    assert.ok(products.find(p => p.id === 100));
    console.log(`${GREEN}✅ addProduct passed${RESET}\n`);
  } else {
    console.log(`${RED}⚠️ addProduct not implemented${RESET}\n`);
  }

  // removeProduct
  if (typeof ecommerce.removeProduct === "function") {
    divider("removeProduct");
    products = ecommerce.removeProduct(products, 100);
    assert.strictEqual(products.find(p => p.id === 100), undefined);
    console.log(`${GREEN}✅ removeProduct passed${RESET}\n`);
  } else {
    console.log(`${RED}⚠️ removeProduct not implemented${RESET}\n`);
  }

  // findProduct
  if (typeof ecommerce.findProduct === "function") {
    divider("findProduct");
    let result = ecommerce.findProduct(products, "Laptop");
    if (typeof result === "object" && result !== null) {
      assert.strictEqual(result.name, "Laptop");
    } else {
      throw new Error("Expected an object with name 'Laptop'");
    }
    console.log(`${GREEN}✅ findProduct found Laptop${RESET}`);

    let notFound = ecommerce.findProduct(products, "NonExistingProduct");
    assert.strictEqual(notFound, "Product not found");
    console.log(`${GREEN}✅ findProduct handles missing product${RESET}\n`);
  } else {
    console.log(`${RED}⚠️ findProduct not implemented${RESET}\n`);
  }

  // updateStock
  if (typeof ecommerce.updateStock === "function") {
    divider("updateStock");
    let updated = ecommerce.updateStock(products, 1, 3);
    assert.ok(updated.stock >= 0);
    console.log(`${GREEN}✅ updateStock increased stock${RESET}`);

    let notUpdated = ecommerce.updateStock(products, 999, 3);
    assert.strictEqual(notUpdated, "Product not found");
    console.log(`${GREEN}✅ updateStock handles invalid ID${RESET}\n`);
  } else {
    console.log(`${RED}⚠️ updateStock not implemented${RESET}\n`);
  }

  // placeOrder
  if (typeof ecommerce.placeOrder === "function") {
    divider("placeOrder");
    let msg = ecommerce.placeOrder(customers, products, orders, 1, 1, 1);
    assert.ok(msg.includes("Order placed"));
    console.log(`${GREEN}✅ placeOrder placed an order${RESET}`);

    let msgInvalid = ecommerce.placeOrder(customers, products, orders, 999, 1, 1);
    assert.strictEqual(msgInvalid, "Customer or Product not found");
    console.log(`${GREEN}✅ placeOrder handles invalid customer/product${RESET}`);

    let msgNoStock = ecommerce.placeOrder(customers, products, orders, 1, 3, 1000);
    assert.strictEqual(msgNoStock, "Not enough stock to place order");
    console.log(`${GREEN}✅ placeOrder handles insufficient stock${RESET}\n`);
  } else {
    console.log(`${RED}⚠️ placeOrder not implemented${RESET}\n`);
  }

  // listOrders
  if (typeof ecommerce.listOrders === "function") {
    divider("listOrders");
    assert.ok(ecommerce.listOrders(orders).includes("orderId"));
    console.log(`${GREEN}✅ listOrders passed${RESET}\n`);
  } else {
    console.log(`${RED}⚠️ listOrders not implemented${RESET}\n`);
  }

  // loadOrders
  if (typeof ecommerce.loadOrders === "function") {
    divider("loadOrders");
    let loaded = ecommerce.loadOrders('[{"orderId":55,"customerId":1,"productId":1,"quantity":1}]');
    assert.strictEqual(loaded[0].orderId, 55);
    console.log(`${GREEN}✅ loadOrders passed${RESET}\n`);
  } else {
    console.log(`${RED}⚠️ loadOrders not implemented${RESET}\n`);
  }

  // getCustomerOrders
  if (typeof ecommerce.getCustomerOrders === "function") {
    divider("getCustomerOrders");
    let custOrders = ecommerce.getCustomerOrders(orders, 1);
    assert.ok(Array.isArray(custOrders));
    console.log(`${GREEN}✅ getCustomerOrders passed${RESET}\n`);
  } else {
    console.log(`${RED}⚠️ getCustomerOrders not implemented${RESET}\n`);
  }

  // getLowStockProducts
  if (typeof ecommerce.getLowStockProducts === "function") {
    divider("getLowStockProducts");
    let lowStock = ecommerce.getLowStockProducts(products, 3);
    assert.ok(Array.isArray(lowStock));
    console.log(`${GREEN}✅ getLowStockProducts passed${RESET}\n`);
  } else {
    console.log(`${RED}⚠️ getLowStockProducts not implemented${RESET}\n`);
  }

  // generateRestockReport
  if (typeof ecommerce.generateRestockReport === "function") {
    divider("generateRestockReport");
    let report = ecommerce.generateRestockReport(products, 3);
    assert.ok(report.startsWith("["));
    console.log(`${GREEN}✅ generateRestockReport passed${RESET}\n`);
  } else {
    console.log(`${RED}⚠️ generateRestockReport not implemented${RESET}\n`);
  }

  console.log(`${GREEN}🎉 Tests completed!${RESET}`);
} catch (err) {
  console.error(`${RED}❌ Test failed: ${err.message}${RESET}`);
}
