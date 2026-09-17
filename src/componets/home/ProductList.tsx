import { useEffect } from "react";
import { useFilters } from "../../hooks/useFilters";
import { Pagination } from "./pagination/Pagination";
import { ProductItem } from "./ProductItem";
import { usePagination } from "../../hooks/usePagination";

const SKELETONS = Array.from({ length: 8 }, (_, index) => index);

export const ProductList = () => {
  const { page, numberOfItems, setPage } = usePagination();
  const { filteredProducts, loading, filters } = useFilters();
  const darkMode = document.documentElement.classList.contains("dark");

  useEffect(() => {
    setPage(1);
  }, [filters, setPage]);

  const visibleProducts = filteredProducts.slice(
    numberOfItems * (page - 1),
    numberOfItems * (page - 1) + numberOfItems
  );

  return (
    <div className="product-results" aria-live="polite">
      <div className="result-bar">
        <span>
          Showing <strong>{loading ? "—" : filteredProducts.length}</strong> pieces
        </span>
        <span>{loading ? "Updating selection" : `Page ${page}`}</span>
      </div>

      {loading ? (
        <ul className="product-grid" aria-label="Loading products">
          {SKELETONS.map((skeleton) => (
            <li className="skeleton-card" key={skeleton} aria-hidden="true" />
          ))}
        </ul>
      ) : filteredProducts.length > 0 ? (
        <ul className="product-grid" aria-label="Product list">
          {visibleProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              darkMode={darkMode}
            />
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <div>
            <strong>No pieces found.</strong>
            <span>Try widening your search or choosing another category.</span>
          </div>
        </div>
      )}

      {!loading && filteredProducts.length > numberOfItems && <Pagination />}
    </div>
  );
};
