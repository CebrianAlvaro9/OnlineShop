import { useEffect, useState } from "react";
import { useFilters } from "../../hooks/useFilters";
import { Pagination } from "./Pagination";
import { AddCartButton } from "./AddCartButton";
import { LazyImage } from "./LazyImage";

export const ProductList = () => {
  const [page, setPage] = useState(0);
  const NUMBER_OF_PAGES = 10;
  const { filteredProducts, loading, filters } = useFilters();

  useEffect(() => {
    setPage(0);
  }, [filters]);

  return (
    <div>
      <ul className="pt-4 flex flex-wrap gap-5 justify-center">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts
            .slice(
              NUMBER_OF_PAGES * page,
              NUMBER_OF_PAGES * page + NUMBER_OF_PAGES
            )
            .map((product) => (
              <li
                className="w-72  shadow-xl rounded-lg p-4 dark:bg-neutral-900 dark:border dark:border-neutral-800  bg-white relative" // Asegúrate de que sea relative
                key={product.id}
              >
                <div className="py-12 flex items-center justify-center">
                  <LazyImage product={product} />
                </div>
                <li>{product.title}</li>
                <div className="flex items-center  w-full mt-8 justify-between">
                  <p>{product.price} $</p>
                  <AddCartButton product={product} />
                </div>
              </li>
            ))
        ) : (
          <p className="text-center dark:text-white">
            {loading ? "Loading..." : "No products found"}
          </p>
        )}
      </ul>
      {filteredProducts.length > 10 && (
        <Pagination
          length={filteredProducts.length}
          page={page}
          setPage={setPage}
          NUMBER_OF_PAGES={NUMBER_OF_PAGES}
        />
      )}
    </div>
  );
};
