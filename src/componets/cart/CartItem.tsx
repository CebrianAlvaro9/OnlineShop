import { Product } from "../../types/product.type";
import { CloseIcon } from "./CloseIcon";

interface Props {
  product: Product;
  decrementQuantity: (product: Product) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
}

export const CartItem = ({
  product,
  decrementQuantity,
  addToCart,
  removeFromCart,
}: Props) => {
  return (
    <>
      <li
        className="flex flex-col  md:flex-row items-center justify-between py-2 md:py-0.5 border-b-2 border-neutral-200 dark:border-neutral-700 "
        key={product.id}
      >
        <div className=" md:w-2/3 flex flex-col md:flex-row  items-center md:justify-between    ">
          <div className=" flex flex-row items-center  gap-4 md:gap-8 md:w-full">
            <span
              className="cursor-pointer"
              onClick={() => removeFromCart(product)}
            >
              <CloseIcon />
            </span>
            <img
              className="w-14 aspect-square object-cover"
              src={product.images[0]}
              alt=""
            />
          </div>

          <span className="md:w-full text-left">{product.title}</span>
        </div>

        <div className="flex flex-row gap-3 items-center ">
          <span>{(product.price * product.quantity).toFixed(2)}$</span>

          <div
            className="w-32 py-2 px-3 dark:bg-neutral-200  bg-white border border-gray-200 rounded-lg"
            data-hs-input-number=""
          >
            <div className="w-full flex justify-between items-center gap-x-3">
              <input
                className=" w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                type="number"
                aria-roledescription="Number field"
                value={product.quantity}
                data-hs-input-number-input=""
              />
              <div className="  flex justify-end items-center gap-x-1.5">
                <button
                  onClick={() => decrementQuantity(product)}
                  type="button"
                  className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  aria-label="Decrease"
                  data-hs-input-number-decrement=""
                >
                  <svg
                    className="shrink-0 size-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14"></path>
                  </svg>
                </button>
                <button
                  onClick={() => addToCart(product)}
                  type="button"
                  className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  aria-label="Increase"
                  data-hs-input-number-increment=""
                >
                  <svg
                    className="shrink-0 size-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};
