import { useEffect, useState } from "react";
import { Product } from "../types/product.type";

export const useFetchApi = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const fetchProducts = async () => {
      const response = await fetch("https://dummyjson.com/products?limit=200");
      const data: { products: Product[] } = await response.json();
      setProducts(data.products);
      //set up categories
      const categoriesAll = data.products.map((product) => product.category);
      setCategories([...new Set(categoriesAll)]);
    };
  
    useEffect(() => {
      fetchProducts();
    }, []);
  
    return {
      products,
      categories,
    };
  };