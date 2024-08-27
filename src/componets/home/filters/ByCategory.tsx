import { useFilters } from "../../../hooks/useFilters";

export const ByCategory = () => {
  const { filters, setFilters, categories } = useFilters();

  return (
    <form className="">
      <label
        form="countries"
        className="block  text-sm font-medium text-neutral-900 dark:text-white"
      ></label>
      <select
        defaultValue="Select"
        id="category"
        onChange={(e) =>
          setFilters({ ...filters, category: e.target.value, price: 0 })
        }
        className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500"
      >
        <option key="All" value="">
          All
        </option>
        {categories.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </form>
  );
};
