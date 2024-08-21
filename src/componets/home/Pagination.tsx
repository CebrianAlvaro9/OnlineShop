interface Prop {
  length: number;
  page: number;
  setPage: (page: number) => void;
  NUMBER_OF_PAGES: number;
}

export const Pagination = ({
  length,
  page,
  setPage,
  NUMBER_OF_PAGES,
}: Prop) => {
  return (
    <div className="text-center p-10 flex gap-2 items-center content-center justify-center">
      <span
        onClick={() => setPage(page > 0 ? page - 1 : page)}
        className=" text-bold items-center cursor-pointer border rounded-md bg-slate-50 dark:bg-slate-700 py-1 px-3 "
      >
        -
      </span>
      <span>Page: {page}</span>
      <span
        onClick={() =>
          setPage(length / NUMBER_OF_PAGES > page + 1 ? page + 1 : page)
        }
        className=" text-bold items-center cursor-pointer border rounded-md bg-slate-50 dark:bg-slate-700 py-1 px-3 "
      >
        +
      </span>
    </div>
  );
};
