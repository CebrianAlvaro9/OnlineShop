import { createContext, ReactNode, useState } from "react";
import { Product } from "../types/product.type";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  clearCart: () => void;
  removeFromCart: (product: Product) => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  clearCart: () => {},
  removeFromCart: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const productInCart = cart.find((item) => item.id === product.id);

    if (productInCart) {
      const newCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      return setCart(newCart);
    }

    setCart((prev) => [...prev, { ...product, quantity: 1 }]);
  };

  const removeFromCart = (product: Product) => {
    const newCart = cart.filter((item) => item.id !== product.id);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
