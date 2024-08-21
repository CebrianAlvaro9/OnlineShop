import { useState } from "react";
import { CartIcon } from "../icons";
import { useCart } from "../../hooks/useCart";

export const Cart = () => {
  const [modal, setModal] = useState<boolean>(false);

  const { cart, clearCart, addToCart } = useCart();

  return (
    <div>
      <div onClick={() => setModal(!modal)}>
        <CartIcon />
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-20">
          <div className="bg-slate-400 min-h-fit  w-2/6 m-4 rounded-lg relative z-30">
            <span
              onClick={() => setModal(false)}
              className="dark:text-white p-1 cursor-pointer text-2xl absolute top-2 left-2"
            >
              ✘
            </span>
            <div className="p-8">
              {cart.length > 0 &&
                cart.map((product) => (
                  <ul
                    key={product.id}
                    className="flex flex-row justify-between p-2"
                  >
                    <li>
                      <img className="w-14" src={product.thumbnail} alt="" />
                    </li>
                    <li className="text-lg">{product.title}</li>
                    <li className="flex flex-row gap-2 items-center ">
                      <span className="border border-black rounded p-2 cursor-pointer">
                        -
                      </span>
                      <span className="text-lg">{product.quantity}</span>
                      <span
                        onClick={() => addToCart(product)}
                        className="border border-black rounded p-2 cursor-pointer select-none"
                      >
                        +
                      </span>
                    </li>
                  </ul>
                ))}

              <button
                onClick={() => clearCart()}
                className="p-2 text-black rounded border bordered-black bg-red-400 hover:bg-red-500 hover:text-white"
              >
                Clear cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
