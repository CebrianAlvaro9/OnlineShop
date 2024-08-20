import { useFilters } from "../../hooks/useFilters";

interface Props {
  setSearchInput: (searchInput: string) => void;
}
export const ByName = () => {
  const { filters, setFilters } = useFilters();

  return (
    <div>
      <p>Search By title</p>
      <input
        onChange={(e) =>
          setFilters({ ...filters, price: 0, name: e.target.value })
        }
        type="text"
        className="w-full p-1 border border-gray-300 rounded dark:text-black"
      />
    </div>
  );
};
