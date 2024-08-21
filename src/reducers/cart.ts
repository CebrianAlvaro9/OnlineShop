import { Product } from "../types/product.type";

interface CartItem extends Product {
  quantity: number;
}

export const updateLocalStorage = (cart: CartItem[]) => {
  window.localStorage.setItem("cart", JSON.stringify(cart));
};

export const initialCartState: CartItem[] =
  JSON.parse(window.localStorage.getItem("cart") as string) || [];
export const reducer = (state: CartItem[], action: any) => {
  const { type: actionType, payload: actionPayload } = action;

  switch (actionType) {
    case "ADD_TO_CART": {
      const { id } = actionPayload;
      const productInCart = state.find((item) => item.id === id);

      if (productInCart) {
        const newState = state.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        updateLocalStorage(newState);
        return newState;
      }

      const newState = [...state, { ...actionPayload, quantity: 1 }];
      updateLocalStorage(newState);
      return newState;
    }
    case "DECREMENT_QUANTITY": {
      const { id } = actionPayload;
      const productInCart = state.find((item) => item.id === id);

      if (productInCart) {
        if (productInCart.quantity > 1) {
          const newState = state.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          );
          updateLocalStorage(newState);
          return newState;
        } else {
          const newState = state.filter((item) => item.id !== id);
          updateLocalStorage(newState);
          return newState;
        }
      }
      return state;
    }
    case "REMOVE_FROM_CART": {
      const newState = state.filter((item) => item.id !== action.payload.id);
      updateLocalStorage(newState);
      return newState;
    }
    case "CLEAR_CART": {
      updateLocalStorage([]);
      return [];
    }
  }
  return state;
};
