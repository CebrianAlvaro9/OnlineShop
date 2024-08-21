import { ByCategory } from "../componets/home/filters/ByCategory";
import { ByMinPrice } from "../componets/home/filters/ByMinPrice";
import { ByName } from "../componets/home/filters/ByName";
import { ProductList } from "../componets/home/ProductList";
//https://dummyjson.com/products?limit=10

export const HomePage = () => {
  return (
    <div className="p-5  dark:text-white">
      <div className=" flex flex-wrap gap-6 justify-center items-center py-2">
        <ByCategory />
        <ByName />
        <ByMinPrice />
      </div>
      <section>
        <ProductList />
      </section>
    </div>
  );
};
