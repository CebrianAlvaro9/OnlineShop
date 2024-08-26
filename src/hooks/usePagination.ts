import { useContext } from "react";
import { PaginationContext } from "../context/pagination";

export const usePagination = () => {
  const pagination = useContext(PaginationContext);

  if (pagination === undefined) {
    throw new Error("useCart must be used within a PaginationProvider");
  }

  return pagination;
};
