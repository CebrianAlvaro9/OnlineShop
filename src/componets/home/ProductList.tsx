import { useEffect, useState } from "react";
import { useFilters } from "../../hooks/useFilters";
import { Pagination } from "./Pagination";
import { ProductItem } from "./ProductItem";

export const ProductList = () => {
  const [page, setPage] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(10);
  const { filteredProducts, loading, filters } = useFilters();
  const darkMode = JSON.parse(
    window.sessionStorage.getItem("darkMode") as string
  );
  useEffect(() => {
    setPage(0);
  }, [filters]);

  return (
    <div>
      <ul className="pt-4 flex flex-wrap gap-5 justify-center">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts
            .slice(numberOfItems * page, numberOfItems * page + numberOfItems)
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
      {filteredProducts.length > numberOfItems && (
        <Pagination
          length={filteredProducts.length}
          page={page}
          setPage={setPage}
          numberOfItems={numberOfItems}
          setNumberOfItems={setNumberOfItems}
        />
      )}
    </div>
  );
};
