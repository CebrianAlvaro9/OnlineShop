import { useFilters } from "../../../hooks/useFilters";

export const ByCategory = () => {
  const { filters, setFilters, categories } = useFilters();

  return (
    <div className="filter-field">
      <label className="filter-label" htmlFor="category">
        Category
      </label>
      <select
        id="category"
        value={filters.category}
        onChange={(event) =>
          setFilters({ ...filters, category: event.target.value, price: 0 })
        }
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};
