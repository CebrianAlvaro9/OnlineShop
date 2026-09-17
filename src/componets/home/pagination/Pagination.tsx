import { PaginationNitems } from "./PaginationNitems";
import { PaginationNpage } from "./PaginationNpage";

export const Pagination = () => {
  return (
    <div className="pagination-bar">
      <PaginationNitems />
      <PaginationNpage />
    </div>
  );
};
