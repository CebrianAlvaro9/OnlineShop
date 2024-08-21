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
            ? "bg-red-500 hover:bg-red-800"
            : "bg-emerald-500 hover:bg-emerald-800"
        }  select-none absolute top-[-4px] left-[-4px]  text-black rounded-full w-6 h-6 flex justify-center items-center  focus:outline-none`}
      >
        <p className=" font-extrabold text-xl ">
          {isProductInCart ? "-" : "+"}
        </p>
      </button>
    </>
  );
};
