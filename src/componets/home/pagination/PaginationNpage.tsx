import { useFilters } from "../../../hooks/useFilters";
import { usePagination } from "../../../hooks/usePagination";

export const PaginationNpage = () => {
  const { page, setPage, numberOfItems } = usePagination();
  const { filteredProducts } = useFilters();

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / numberOfItems);
  const paginationItems = [];

  const startPage = Math.max(1, page - 3); // 3 páginas anteriores
  const endPage = Math.min(totalPages, page + 3); // 3 páginas posteriores

  for (let i = startPage; i <= endPage; i++) {
    paginationItems.push(
      <li key={i}>
        <a
          aria-current={page === i ? "page" : undefined}
          className={` z-10 flex items-center justify-center px-3 h-8 leading-tight 
                      ${
                        page === i
                          ? "text-blue-600 border dark:border-neutral-900 dark:bg-black border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                          : "text-neutral-500 border border-neutral-300 bg-white hover:bg-neutral-100 hover:text-neutral-900"
                      } 
                      dark:border-neutral-700 dark:bg-neutral-700 dark:text-white`}
          onClick={() => setPage(i)}
        >
          {i}
        </a>
      </li>
    );
  }

  return (
    <nav aria-label="Page navigation example ">
      <ul className="flex  items-center -space-x-px h-12 text-sm">
        <li onClick={() => setPage(page > 1 ? page - 1 : page)}>
          <a
            className={`${
              page === 1 ? "cursor-not-allowed  " : ""
            } flex items-center justify-center px-3 h-8 ms-0 leading-tight text-neutral-500 bg-white border border-e-0 border-neutral-300 rounded-s-lg hover:bg-neutral-100 hover:text-neutral-700 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white`}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </a>
        </li>

        {paginationItems}

        {/* <li>
          <a
            href="#"
            aria-current="page"
            className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
          >
            3
          </a>
        </li> */}

        <li onClick={() => setPage(totalPages > page + 1 ? page + 1 : page)}>
          <a
            className={`${
              totalPages === page ? "cursor-not-allowed  " : ""
            }  flex items-center justify-center px-3 h-8 leading-tight text-neutral-500 bg-white border border-neutral-300 rounded-e-lg hover:bg-neutral-100 hover:text-neutral-700 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white`}
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
};
