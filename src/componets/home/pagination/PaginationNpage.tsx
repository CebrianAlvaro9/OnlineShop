import { useFilters } from "../../../hooks/useFilters";
import { usePagination } from "../../../hooks/usePagination";

const Arrow = ({ direction }: { direction: "previous" | "next" }) => (
  <span aria-hidden="true">{direction === "previous" ? "←" : "→"}</span>
);

export const PaginationNpage = () => {
  const { page, setPage, numberOfItems } = usePagination();
  const { filteredProducts } = useFilters();
  const totalPages = Math.ceil(filteredProducts.length / numberOfItems);
  const startPage = Math.max(1, page - 2);
  const endPage = Math.min(totalPages, page + 2);
  const paginationItems = [];

  for (let index = startPage; index <= endPage; index += 1) {
    paginationItems.push(
      <li key={index}>
        <button
          type="button"
          aria-current={page === index ? "page" : undefined}
          aria-label={`Go to page ${index}`}
          className={`pagination-button ${page === index ? "is-active" : ""}`}
          onClick={() => setPage(index)}
        >
          {index}
        </button>
      </li>
    );
  }

  return (
    <nav aria-label="Product pages">
      <ul className="pagination-nav">
        <li>
          <button
            type="button"
            className="pagination-button"
            aria-label="Previous page"
            disabled={page <= 1}
            onClick={() => setPage(Math.max(1, page - 1))}
          >
            <Arrow direction="previous" />
          </button>
        </li>
        {paginationItems}
        <li>
          <button
            type="button"
            className="pagination-button"
            aria-label="Next page"
            disabled={page >= totalPages}
            onClick={() => setPage(Math.min(totalPages, page + 1))}
          >
            <Arrow direction="next" />
          </button>
        </li>
      </ul>
    </nav>
  );
};
