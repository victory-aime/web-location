const ordersTableData = Array.from({ length: 30 }, (_, i) => ({
  orderId: i + 1,
  product: {
    name: `category ${i + 1}`,
    numberOfproducts: (Math.random() * 100).toFixed(0),
  },
  client: ["victory", "darnel", "aime", "clark", "chloe"][i % 5],
  status: ["NEW", "IN_PROGRESS", "DONE", "REJECTED"][i % 5],
  payment: "aucun",
  totalAmount: (Math.random() * 1000).toFixed(2),
  date: "29 Jun 2025",
}));

const ordersInProgressData = Array.from({ length: 15 }, (_, i) => ({
  orderId: i + 1,
  product: {
    name: `category ${i + 1}`,
    numberOfproducts: (Math.random() * 100).toFixed(0),
  },
  client: ["victory", "darnel", "aime", "clark", "chloe"][i % 5],
  status: "IN_PROGRESS",
  payment: "aucun",
  totalAmount: (Math.random() * 1000).toFixed(2),
  date: "29 Jun 2025",
}));

const orderDeliveredData = Array.from({ length: 25 }, (_, i) => ({
  orderId: i + 1,
  product: {
    name: `category ${i + 1}`,
    numberOfproducts: (Math.random() * 100).toFixed(0),
  },
  client: ["victory", "darnel", "aime", "clark", "chloe"][i % 5],
  status: "DONE",
  payment: "aucun",
  totalAmount: (Math.random() * 1000).toFixed(2),
  date: "29 Jun 2025",
}));

const ordersCancelledData = Array.from({ length: 13 }, (_, i) => ({
  orderId: i + 1,
  product: {
    name: `category ${i + 1}`,
    numberOfproducts: (Math.random() * 100).toFixed(0),
  },
  client: ["victory", "darnel", "aime", "clark", "chloe"][i % 5],
  status: "REJECTED",
  payment: "aucun",
  totalAmount: (Math.random() * 1000).toFixed(2),
  date: "29 Jun 2025",
}));

export {
  ordersTableData,
  ordersInProgressData,
  orderDeliveredData,
  ordersCancelledData,
};
