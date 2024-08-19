import { useFilters } from "../../hooks/useFilters";

export const ByCategory = () => {
  const { setFilters, categories } = useFilters();

  return (
    <form className="max-w-sm mx-auto">
      <label
        form="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select a category
      </label>
      <select
        defaultValue="Select"
        id="category"
        onChange={(e) =>
          setFilters({
            category: e.target.value,
            price: "",
            name: "",
          })
        }
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
