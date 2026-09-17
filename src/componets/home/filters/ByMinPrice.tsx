import { useFilters } from "../../../hooks/useFilters";

export const ByMinPrice = () => {
  const { minPrice, maxPrice, filters, setFilters } = useFilters();
  const minimum = typeof minPrice === "number" ? minPrice : 0;
  const maximum = typeof maxPrice === "number" ? maxPrice : 0;

  return (
    <div className="filter-field">
      <label className="filter-label" htmlFor="minimum-price">
        Minimum price
      </label>
      <div className="filter-control">
        <input
          id="minimum-price"
          type="range"
          min={minimum}
          max={maximum}
          step="1"
          value={filters.price}
          disabled={!maximum}
          onChange={(event) =>
            setFilters({ ...filters, price: Number(event.target.value) })
          }
        />
        <output htmlFor="minimum-price">
          {filters.price > 0 ? `${filters.price}$` : "Any"}
        </output>
      </div>
    </div>
  );
};
