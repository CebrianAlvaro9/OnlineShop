import { useFilters } from "../../hooks/useFilters";

export const ByMinPrice = () => {
  const { minPrice, maxPrice, filters, setFilters } = useFilters();
  return (
    <div className="">
      <label
        htmlFor="default-range"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Price {minPrice}$ min. {maxPrice}$ max.
      </label>

      <div className="flex items-center gap-2 ">
        <input
          className="range w-full accent-slate-900 dark:accent-slate-50"
          type="range"
          min={minPrice ? minPrice : 0}
          max={maxPrice ? maxPrice : 0}
          step="1"
          value={filters.price}
          onChange={(e) =>
            setFilters({ ...filters, price: parseInt(e.target.value) })
          }
        />
        {filters.price > 0 && (
          <div className="text-sm font-medium text-gray-900 dark:text-white ">
            {filters.price}$
          </div>
        )}
      </div>
    </div>
  );
};
