const fetchProducts = async (filters?: any) => {
   
    return Array.from({ length: 30 }).map((_, index) => ({
      id: index * 10,
      name: `Produit ${index + 1 * 10}`,
      category: "Category",
      price: Math.floor(Math.random() * 100) + 10,
      image: "/assets/images/bag.jpg",
    }));
  };


  export {fetchProducts}