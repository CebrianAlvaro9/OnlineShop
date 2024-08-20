import { useContext, useMemo, useState } from "react";
import { FiltersContext } from "../context/filters";
import { useFetchApi } from "./useFetchApi";

export const useFilters = () => {
  const { products, categories, loading } = useFetchApi();
  const { filters, setFilters } = useContext(FiltersContext);

  // The reason of the separation of the filters is for dinamic min and max price
  // Also the code is easier to read and to modify
  // Filter for category
  const filteredProductsByCategory = useMemo(() => {
    return filters.category && filters.category.length > 0
      ? products.filter((product) => product.category === filters.category)
      : products;
  }, [products, filters.category]);

  //Filter for name

  const filteredProductsByName = useMemo(() => {
    return filteredProductsByCategory.filter((p) =>
      p.title.toLowerCase().includes(filters.name.toLowerCase())
    );
  }, [filteredProductsByCategory, filters.name]);

  // Dinamic recalculation of the min and max price
  const maxPrice = useMemo(() => {
    return (
      filteredProductsByName.length > 0 &&
      Math.max(...filteredProductsByName.map((product) => product.price))
    );
  }, [filteredProductsByName]);
  const minPrice = useMemo(() => {
    return (
      filteredProductsByName.length > 0 &&
      Math.min(...filteredProductsByName.map((product) => product.price))
    );
  }, [filteredProductsByName]);

  //Filter for price
  const filteredProducts = useMemo(() => {
    return filteredProductsByName.length > 0
      ? filteredProductsByName.filter((p) => p.price >= filters.price)
      : [];
  }, [filteredProductsByName, filters.price]);

  return {
    filters,
    setFilters,
    categories,
    filteredProducts,
    minPrice,
    maxPrice,
    loading,
  };
};
