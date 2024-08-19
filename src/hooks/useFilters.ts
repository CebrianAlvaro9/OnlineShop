import { useContext, useMemo } from "react";
import { FiltersContext } from "../context/filters";
import { useFetchApi } from "./useFetchApi";

export const useFilters = () => {
  const { products, categories } = useFetchApi();
  const { filters, setFilters } = useContext(FiltersContext);

  const filteredProducts = useMemo(() => {
    return filters.category && filters.category.length > 0
      ? products.filter((product) => product.category === filters.category)
      : products;
  }, [products, filters.category]);

  return { filters, setFilters, categories, filteredProducts };
};
