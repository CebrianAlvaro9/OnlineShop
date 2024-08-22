import React from "react";
import { useCart } from "../../hooks/useCart";
import { CloseIcon } from "./CloseIcon";
import "./cart.css";
interface Props {
  setModal: (modal: boolean) => void;
}

export const Modal = ({ setModal }: Props) => {
  const { cart, clearCart, addToCart, decrementQuantity } = useCart();

  const handleCloseModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // Cierra el modal si el clic fue fuera del contenedor del modal
    if (e.target === e.currentTarget) {
      setModal(false);
    }
  };

  const bagTotal = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  return (
    <div
      onClick={handleCloseModal}
      className=" zoom-in fixed inset-0 flex items-center justify-center z-20"
    >
      <div
        className="modal-overlay  shadow-lg shadow-neutral-300 dark:shadow-neutral-900 overflow-hidden bg-slate-50 dark:bg-neutral-900 min-h-fit md:w-3/6 m-4 rounded-2xl relative z-30 border border-neutral-200 dark:border-neutral-700 transform transition-all duration-300 ${
             "
      >
        <span
          onClick={() => setModal(false)}
          className="dark:text-white  p-4 cursor-pointer absolute top-0 right-0"
        >
          <CloseIcon />
        </span>
        <div className="flex flex-col justify-between h-full ">
          <header className="pt-6">
            <h4 className="text-lg md:text-2xl text-neutral-500 dark:text-neutral-100 font-bold text-center mb-8">
              Your bag total is{" "}
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                {" " + bagTotal.toFixed(2)} $
              </span>{" "}
              🛍️
            </h4>
          </header>
          <div className=" px-2 md:p-8 ">
            {cart.length > 0 ? (
              <div>
                <ul className=" p-2 dark:text-white md:text-lg overflow-y-auto max-h-[55vh]	  ">
                  {cart.map((product) => (
                    <li
                      className="flex flex-row items-center justify-between py-0.5"
                      key={product.id}
                    >
                      <img className="w-14" src={product.thumbnail} alt="" />

                      <span>{product.title}</span>

                      <div className="flex flex-row gap-3 items-center ">
                        <span>
                          {(product.price * product.quantity).toFixed(2)} $
                        </span>
                        <span
                          onClick={() => decrementQuantity(product)}
                          className="dark:bg-neutral-100 bg-neutral-900 text-white dark:text-black font-bold rounded px-2 cursor-pointer"
                        >
                          -
                        </span>
                        <span className="text-lg">{product.quantity}</span>
                        <span
                          onClick={() => addToCart(product)}
                          className="dark:bg-neutral-100 bg-neutral-900 text-white dark:text-black font-bold rounded px-2  cursor-pointer"
                        >
                          +
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <p className="text-2xl text-neutral-500 dark:text-neutral-100 font-bold text-center mb-8">
                  Sorry Your cart is empty :(
                </p>
              </div>
            )}
          </div>
          <footer className="w-full  bg-neutral-200 dark:bg-neutral-800 h-1/8   p-6 flex justify-end items-center gap-4">
            <button
              onClick={() => clearCart()}
              className="shadow-lg shadow-neutral-300 dark:shadow-neutral-900/50  p-1 px-3 font-semibold text-black dark:text-white rounded-lg bg-neutral-50 hover:bg-neutral-400    dark:bg-neutral-900  dark:hover:bg-neutral-600 "
            >
              Clear cart
            </button>
            <button className=" p-1 px-3 font-semibold text-white dark:text-black rounded-lg  dark:bg-neutral-50 dark:hover:bg-neutral-400 bg-neutral-900  hover:bg-neutral-600">
              Check Out
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};
