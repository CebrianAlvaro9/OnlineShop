import { Product } from "../../types/product.type";
import { AddCartButton } from "./AddCartButton";
import { LazyLoadImageComponent } from "./LazyLoadImageComponent";

interface Props {
  product: Product;
  darkMode: boolean;
}

export const ProductItem = ({ product, darkMode }: Props) => {
  return (
    <div>
      <li
        className=" transition ease-in-out hover:-translate-y-1 hover:scale-105 hover:shadow-2xl duration-50
        w-72  shadow-xl rounded-2xl p-4 dark:bg-neutral-900 dark:border dark:border-neutral-800 border-neutral-500 bg-white relative" // Asegúrate de que sea relative
        key={product.id}
      >
        <div className="py-12 flex items-center justify-center">
          <LazyLoadImageComponent
            darkMode={darkMode}
            url={product.images[0]}
            title={product.title}
          />
        </div>
        <li className=" ">{product.title.slice(0, 30)}</li>
        <div className="flex items-center  w-full mt-8 justify-between">
          <p className="text-sm font-light ">{product.price} $</p>
          <AddCartButton product={product} />
        </div>
      </li>
    </div>
  );
};
