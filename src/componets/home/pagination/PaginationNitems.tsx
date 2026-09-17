import { usePagination } from "../../../hooks/usePagination";

export const PaginationNitems = () => {
  const { setNumberOfItems, setPage } = usePagination();

  const handleChange = (value: string) => {
    setNumberOfItems(Number(value));
    setPage(1);
  };

  return (
    <label className="pagination-size" htmlFor="items-per-page">
      <span>Show per page</span>
      <select
        id="items-per-page"
        defaultValue="10"
        onChange={(event) => handleChange(event.target.value)}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
      </select>
    </label>
  );
};
