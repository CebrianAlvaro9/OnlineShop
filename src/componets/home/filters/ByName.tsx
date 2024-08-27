import { useFilters } from "../../../hooks/useFilters";

export const ByName = () => {
  const { filters, setFilters } = useFilters();

  return (
    <div>
      <input
        onChange={(e) =>
          setFilters({ ...filters, price: 0, name: e.target.value })
        }
        type="text"
        className="w-full p-1.5 border border-gray-300 rounded dark:text-black"
        placeholder="Search..."
      />
    </div>
  );
};
