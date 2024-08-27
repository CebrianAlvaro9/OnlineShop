import { useCart } from "../../hooks/useCart";
import { Product } from "../../types/product.type";

export const AddCartButton = ({ product }: { product: Product }) => {
  const { addToCart, cart, removeFromCart } = useCart();

  const isProductInCart = cart.find((item) => item.id === product.id);

  return (
    <>
      <button
        onClick={() =>
          isProductInCart ? removeFromCart(product) : addToCart(product)
        }
        className={`${
          isProductInCart
            ? "dark:bg-neutral-950 bg-neutral-700 hover:bg-neutral-800  text-white dark:text-white"
            : "bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-400 text-black dark:text-black"
        }     rounded-lg p-1.5 text-sm flex justify-center items-center  focus:outline-none `}
      >
        {isProductInCart ? "Remove" : "Add to Cart "}
      </button>
    </>
  );
};
