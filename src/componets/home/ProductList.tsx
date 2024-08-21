import { useEffect, useState } from "react";
import { useFilters } from "../../hooks/useFilters";
import { Pagination } from "./Pagination";
import { AddCartButton } from "./addCartButton";

export const ProductList = () => {
  const [page, setPage] = useState(0);
  const NUMBER_OF_PAGES = 10;
  const { filteredProducts, loading, filters } = useFilters();

  useEffect(() => {
    setPage(0);
  }, [filters]);

  return (
    <div>
      <div className="pt-4 flex flex-wrap gap-5 justify-center">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts
            .slice(
              NUMBER_OF_PAGES * page,
              NUMBER_OF_PAGES * page + NUMBER_OF_PAGES
            )
            .map((product) => (
              <ul
                className="w-48 rounded-lg p-2 dark:bg-stone-700 bg-stone-100 relative" // Asegúrate de que sea relative
                key={product.id}
              >
                <AddCartButton product={product} />
                <li>
                  <img className="" src={product.thumbnail} alt="loading" />
                </li>
                <li>{product.title}</li>
                <li>{product.price} $</li>
              </ul>
            ))
        ) : (
          <p className="text-center dark:text-white">
            {loading ? "Loading..." : "No products found"}
          </p>
        )}
      </div>
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
