const categoryData = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  category: {
    name: `Command ${i + 1}`,
    desc: `desc ${i + 1}`,
  },

  sold: (Math.random() * 100).toFixed(0),
  stock: (Math.random() * 100).toFixed(0),
  price: (Math.random() * 1000).toFixed(2),
  added: '29 Jun 2025',
}));

export { categoryData };
