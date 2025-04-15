import { useState, useEffect } from 'react';
import { CustomToast,ToastStatus } from '_components/custom/toast';

export interface CartItem {
  storeId: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  images: string[];
}

export const fetchCartFromStorage = async (): Promise<CartItem[]> => {
  if (typeof window !== 'undefined') {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return Array.isArray(cart) ? cart : [];
  }
  return [];
};
export const saveCartToStorage = (cart: CartItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('cart') || '[]');
    }
    return [];
  });
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  useEffect(() => {
    fetchCartFromStorage().then((data) => {
      setCart(data);
    });
  }, [triggerRefresh]);

  const removeFromCart = (value: { name: string; id: string }) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== value.id);
      saveCartToStorage(updatedCart);
      setTriggerRefresh(true);
      return updatedCart;
    });
    CustomToast({
      title: 'Article supprimé',
      description: `${value?.name} a été retiré du panier.`,
      type: ToastStatus.WARNING,
      duration: 1000,
    });
  };

  const clearCart = () => {
    setCart([]);
    saveCartToStorage([]);
    setTriggerRefresh(true);
    CustomToast({
      title: 'Panier vidé',
      description: 'Tous les articles ont été supprimés.',
      type: ToastStatus.ERROR,
      duration: 2000,
    });
  };

  const calculateTotalPrice = (cart: { price: number; quantity: number }[]) => {
    return cart.reduce(
      (total: number, item: { price: number; quantity: number }) =>
        total + item.price * item.quantity,
      0
    );
  };

  return {
    cart,
    setCart,
    removeFromCart,
    clearCart,
    triggerRefresh,
    fetchCartFromStorage,
    setTriggerRefresh,
    calculateTotalPrice,
  };
};

export { useCart };
