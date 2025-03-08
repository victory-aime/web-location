import { useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
}

const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Récupérer le panier depuis le localStorage
  const fetchCartFromStorage = () => {
    if (typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(storedCart);
    }
  };

  // Ajouter un produit au panier
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });

    setTimeout(() => {
      fetchCartFromStorage(); // Met à jour l'état après ajout
    }, 500);
  };

  // Supprimer un produit du panier
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));

    setTimeout(() => {
      fetchCartFromStorage(); // Rafraîchit après suppression
    }, 500);
  };

  // Vider le panier
  const clearCart = () => {
    setCart([]);
    setTimeout(() => {
      fetchCartFromStorage(); // Rafraîchit après vidage
    }, 500);
  };

  // Mettre à jour la quantité d'un produit
  const updateCartItem = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );

    setTimeout(() => {
      fetchCartFromStorage(); // Rafraîchit après mise à jour
    }, 500);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    updateCartItem,
    fetchCartFromStorage,
  };
};

export default useCart;
