import { createContext, useState, ReactNode } from "react";

interface PaginationContextType {
  page: number;
  setPage: (page: number) => void;
  numberOfItems: number;
  setNumberOfItems: (numberOfItems: number) => void;
}

// Este es el que tenemos que consumir
export const PaginationContext = createContext<PaginationContextType>({
  page: 1,
  setPage: () => {},
  numberOfItems: 10,
  setNumberOfItems: () => {},
});

// Este es el que nos provee de acceso al contexto
export function PaginationProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(10);

  return (
    <PaginationContext.Provider
      value={{ page, setPage, numberOfItems, setNumberOfItems }}
    >
      {children}
    </PaginationContext.Provider>
  );
}
