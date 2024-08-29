import { usePagination } from "../../../hooks/usePagination";

export const PaginationNitems = () => {
  const { setNumberOfItems, setPage } = usePagination();

  const handleOnchange = (e: any) => {
    setNumberOfItems(parseInt(e.target.value));
    setPage(1);
  };
  return (
    <>
      <form className="">
        <select
          onChange={(e) => handleOnchange(e)}
          id="items"
          className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500"
        >
          <option defaultValue="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
        </select>
      </form>
    </>
  );
};
