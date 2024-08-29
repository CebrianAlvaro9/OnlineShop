import { PaginationNitems } from "./PaginationNitems";
import { PaginationNpage } from "./PaginationNpage";

export const Pagination = () => {
  return (
    <div className=" text-center pt-6 flex md:flex-row flex-col justify-center gap-6 items-center w-full ">
      <PaginationNitems />
      <PaginationNpage />
    </div>
  );
};
