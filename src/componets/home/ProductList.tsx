import { useEffect, useState } from "react";
import { useFilters } from "../../hooks/useFilters";
import { Pagination } from "./pagination/Pagination";
import { ProductItem } from "./ProductItem";
import { usePagination } from "../../hooks/usePagination";

export const ProductList = () => {
  // const [page, setPage] = useState(0);
  // const [numberOfItems, setNumberOfItems] = useState(10);

  const { page, numberOfItems, setPage } = usePagination();
  const { filteredProducts, loading, filters } = useFilters();
  const darkMode = JSON.parse(
    window.sessionStorage.getItem("darkMode") as string
  );
  useEffect(() => {
    setPage(1);
  }, [filters]);

  return (
    <div>
      <ul className="pt-4 flex flex-wrap gap-5 justify-center ">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts
            .slice(
              numberOfItems * (page - 1),
              numberOfItems * (page - 1) + numberOfItems
            )
            .map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                darkMode={darkMode}
              />
            ))
        ) : (
          <p className="text-center dark:text-white">
            {loading ? "Loading..." : "No products found"}
          </p>
        )}
      </ul>
      {filteredProducts.length > numberOfItems && <Pagination />}
    </div>
  );
};
