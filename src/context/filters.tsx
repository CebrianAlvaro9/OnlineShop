import { createContext, useState, ReactNode } from "react";

interface Filters {
  category: string;
  price: string;
  name: string;
}

interface FiltersContextType {
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

// Este es el que tenemos que consumir
export const FiltersContext = createContext<FiltersContextType>({
  filters: {
    category: "",
    price: "",
    name: "",
  },
  setFilters: () => {},
});

// Este es el que nos provee de acceso al contexto
export function FiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<Filters>({
    category: "",
    price: "",
    name: "",
  });

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </FiltersContext.Provider>
  );
}
