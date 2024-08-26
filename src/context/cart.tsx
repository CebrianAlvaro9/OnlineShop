import { createContext, ReactNode, useReducer } from "react";
import { Product, Products } from "../types/product.type";
import { initialCartState, reducer } from "../reducers/cart";

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  decrementQuantity: (product: Product) => void;
  clearCart: () => void;
  removeFromCart: (product: Product) => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  decrementQuantity: () => {},
  clearCart: () => {},
  removeFromCart: () => {},
});

const useCartReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialCartState);

  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  const decrementQuantity = (product: Product) => {
    dispatch({ type: "DECREMENT_QUANTITY", payload: product });
  };
  const removeFromCart = (product: Product) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: product });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  return { state, addToCart, decrementQuantity, clearCart, removeFromCart };
};

export function CartProvider({ children }: { children: ReactNode }) {
  const { state, addToCart, decrementQuantity, clearCart, removeFromCart } =
    useCartReducer();
  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        decrementQuantity,
        clearCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
