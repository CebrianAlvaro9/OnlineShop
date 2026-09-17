import { useState } from "react";
import { CartIcon } from "../icons";
import { useCart } from "../../hooks/useCart";
import { Modal } from "./Modal";

export const Cart = () => {
  const [modal, setModal] = useState(false);
  const { cart } = useCart();
  const itemCount = cart.reduce((total, product) => total + product.quantity, 0);

  return (
    <>
      <button
        type="button"
        className="cart-trigger"
        aria-label={`Open cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
        aria-haspopup="dialog"
        aria-expanded={modal}
        onClick={() => setModal(true)}
      >
        <CartIcon />
        <span className="cart-trigger__label">Cart</span>
        <span className="cart-trigger__count" aria-hidden="true">
          {itemCount}
        </span>
      </button>

      {modal && <Modal setModal={setModal} />}
    </>
  );
};
