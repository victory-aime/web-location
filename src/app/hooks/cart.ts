import { CustomToast } from "_/components/custom/toast/CustomToast";
import { ToastStatus } from "_/components/custom/toast/interface/toats";
import { UTILS } from "_/store/src";
import { useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
}

export const fetchCartFromStorage = async (): Promise<any> => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  }
};
export const saveCartToStorage = (cart: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    fetchCartFromStorage().then(setCart);
  }, []);

  // Ajouter un produit au panier
  // const addToCart = (item: CartItem) => {
  //   setCart((prevCart) => {
  //     const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
  //     if (existingItem) {
  //       return prevCart.map((cartItem) =>
  //         cartItem.id === item.id
  //           ? { ...cartItem, quantity: cartItem.quantity + 1 }
  //           : cartItem
  //       );
  //     }
  //     return [...prevCart, { ...item, quantity: 1 }];
  //   });

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const imagesAsFiles = item?.images?.map((base64: string, index: number) =>
        UTILS.base64ToFile(base64, `image_${index}.jpg`)
      );
      const updatedCart = prevCart?.some((cartItem) => cartItem.id === item.id)
        ? prevCart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        : [...prevCart, { ...item, quantity: 1 }];

      saveCartToStorage(updatedCart);
      CustomToast({
        description: "Produit ajouter au panier",
        duration: 3000,
      });
      return updatedCart;
    });
  };

  // Supprimer un produit du panier
  const removeFromCart = (value: { name: string; id: string }) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== value.id);
      saveCartToStorage(updatedCart);
      return updatedCart;
    });
    CustomToast({
      title: "Article supprimé",
      description: `${value?.name} a été retiré du panier.`,
      type: ToastStatus.WARNING,
      duration: 1000,
    });
    fetchCartFromStorage();
  };

  // Vider le panier
  const clearCart = () => {
    setCart([]);
    saveCartToStorage([]);
    CustomToast({
      title: "Panier vidé",
      description: "Tous les articles ont été supprimés.",
      type: ToastStatus.ERROR,
      duration: 2000,
    });
    fetchCartFromStorage();
  };

  // Mettre à jour la quantité d'un produit
  const updateCartItem = (id: string, quantity: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      const existingItemIndex = updatedCart.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        if (quantity === 0) {
          updatedCart.splice(existingItemIndex, 1);
        } else {
          updatedCart[existingItemIndex].quantity = quantity;
        }
      }
      saveCartToStorage(updatedCart);
      return updatedCart;
    });
    fetchCartFromStorage();
    CustomToast({
      type: ToastStatus.INFO,
      description: "Produit mis a jour",
      duration: 3000,
    });
  };

  return {
    cart,
    setCart,
    addToCart,
    removeFromCart,
    clearCart,
    updateCartItem,
    fetchCartFromStorage,
  };
};

export { useCart };
