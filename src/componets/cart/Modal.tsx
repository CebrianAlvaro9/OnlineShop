import { useEffect, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../../hooks/useCart";
import { CloseIcon } from "./CloseIcon";
import "./cart.css";
import { CartItem } from "./CartItem";

interface Props {
  setModal: (modal: boolean) => void;
}

export const Modal = ({ setModal }: Props) => {
  const { cart, clearCart, addToCart, decrementQuantity, removeFromCart } =
    useCart();
  const bagTotal = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const itemCount = cart.reduce((total, product) => total + product.quantity, 0);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModal(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setModal]);

  const handleCloseModal = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setModal(false);
    }
  };

  return createPortal(
    (
    <div
      className="cart-overlay"
      onMouseDown={handleCloseModal}
      role="presentation"
    >
      <section
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <header className="cart-drawer__header">
          <div>
            <p className="cart-drawer__eyebrow">Your selection</p>
            <h2 id="cart-title">Shopping cart</h2>
          </div>
          <button
            type="button"
            className="cart-close"
            aria-label="Close cart"
            onClick={() => setModal(false)}
          >
            <CloseIcon />
          </button>
        </header>

        <div className="cart-drawer__body">
          {cart.length > 0 ? (
            <ul className="cart-items">
              {cart.map((product) => (
                <CartItem
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                  decrementQuantity={decrementQuantity}
                  removeFromCart={removeFromCart}
                />
              ))}
            </ul>
          ) : (
            <div className="cart-empty">
              <div>
                <strong>Your cart is waiting.</strong>
                <span>Add something beautiful to get started.</span>
              </div>
            </div>
          )}
        </div>

        <footer className="cart-drawer__footer">
          <div>
            <span className="cart-total-label">{itemCount} items · total</span>
            <strong className="cart-total">{bagTotal.toFixed(2)} $</strong>
          </div>
          <div className="cart-footer__actions">
            <button
              type="button"
              onClick={clearCart}
              disabled={cart.length === 0}
            >
              Clear
            </button>
            <button type="button">Checkout</button>
          </div>
        </footer>
      </section>
    </div>
    ),
    document.body
  );
};
