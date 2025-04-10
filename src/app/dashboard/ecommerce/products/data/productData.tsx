const productsData = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  product: {
    name: `Command ${i + 1}`,
    variants: (Math.random() * 100).toFixed(0),
  },
  category: ['Electronics', 'Home Appliances', 'Furniture', 'Clothing', 'Accessories'][i % 5],
  status: ['PUBLISH', 'LOW_SCTOK', 'OUT_STOCK', 'DRAFT'][i % 5],
  stock: (Math.random() * 100).toFixed(0),
  price: (Math.random() * 1000).toFixed(2),
  added: '29 Jun 2025',
}));

const publishProductsData = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  product: {
    name: `Command ${i + 1}`,
    variants: (Math.random() * 100).toFixed(0),
  },
  category: ['Electronics', 'Home Appliances', 'Furniture', 'Clothing', 'Accessories'][i % 5],
  status: 'PUBLISH',
  stock: (Math.random() * 100).toFixed(0),
  price: (Math.random() * 1000).toFixed(2),
  added: '29 Jun 2025',
}));

const productStock = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  product: {
    name: `Command ${i + 1}`,
    variants: (Math.random() * 100).toFixed(0),
  },
  category: ['Electronics', 'Home Appliances', 'Furniture', 'Clothing', 'Accessories'][i % 5],
  status: ['LOW_SCTOK', 'OUT_STOCK'][i % 2],
  stock: (Math.random() * 100).toFixed(0),
  price: (Math.random() * 1000).toFixed(2),
  added: '29 Jun 2025',
}));
const draftProducts = Array.from({ length: 13 }, (_, i) => ({
  id: i + 1,
  product: {
    name: `Command ${i + 1}`,
    variants: (Math.random() * 100).toFixed(0),
  },
  category: ['Electronics', 'Home Appliances', 'Furniture', 'Clothing', 'Accessories'][i % 5],
  status: 'DRAFT',
  stock: (Math.random() * 100).toFixed(0),
  price: (Math.random() * 1000).toFixed(2),
  added: '29 Jun 2025',
}));

export { productsData, publishProductsData, productStock, draftProducts };
