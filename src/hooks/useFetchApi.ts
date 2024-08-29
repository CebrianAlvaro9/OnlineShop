import { useEffect, useState } from "react";
import { Product } from "../types/product.type";

export const useFetchApi = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://dummyjson.com/products?limit=200");
      const data: { products: Product[] } = await response.json();
      setProducts(data.products);
      // Configurar categorías
      const categoriesAll = data.products.map((product) => product.category);
      setCategories([...new Set(categoriesAll)]);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    categories,
    loading,
  };
};
