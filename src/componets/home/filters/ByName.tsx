import { useFilters } from "../../../hooks/useFilters";

export const ByName = () => {
  const { filters, setFilters } = useFilters();

  return (
    <div className="filter-field filter-field--search">
      <label className="filter-label" htmlFor="product-search">
        Search
      </label>
      <input
        id="product-search"
        type="search"
        value={filters.name}
        onChange={(event) =>
          setFilters({ ...filters, price: 0, name: event.target.value })
        }
        placeholder="Search the collection"
      />
    </div>
  );
};
