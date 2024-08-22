import { useState } from "react";
import { CartIcon } from "../icons";
import { Modal } from "./Modal";

export const Cart = () => {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <div>
      <div
        className="flex items-center relative group"
        onClick={() => setModal(!modal)}
      >
        <span className="border p-1 px-4 text-white dark:text-black bg-neutral-900 dark:bg-white  rounded-md text-lg">
          <span className=" cursor-pointer dark:text-black font-semibold  dark:bg-white  transition-opacity duration-700 opacity-100 group-hover:opacity-0">
            Cart
          </span>
          <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-700 opacity-0 group-hover:opacity-100">
            <CartIcon />
          </div>
        </span>
      </div>

      {modal && <Modal setModal={setModal} />}
    </div>
  );
};
