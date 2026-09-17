import { useCart } from "../../hooks/useCart";
import { Product } from "../../types/product.type";

export const AddCartButton = ({ product }: { product: Product }) => {
  const { addToCart, cart, removeFromCart } = useCart();
  const isProductInCart = cart.some((item) => item.id === product.id);

  const handleClick = () => {
    if (isProductInCart) {
      removeFromCart(product);
    } else {
      addToCart(product);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isProductInCart}
      className={`cart-action ${isProductInCart ? "is-added" : ""}`}
    >
      {isProductInCart ? "Remove" : "Add to cart"}
    </button>
  );
};
