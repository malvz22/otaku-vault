interface PaginationProps {
  page: number;
  lastPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({ page, lastPage, setPage }) => {
  const scrollTop = () => {
    scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };

  const handleNextPage = () => {
    if (page === lastPage) return;
    setPage((prevState) => prevState + 1);
    scrollTop();
  };
  const handleLastPage = () => {
    setPage(lastPage);
    scrollTop();
  };
  const handleFirstPage = () => {
    setPage(1);
    scrollTop();
  };
  const handlePrevPage = () => {
    if (page === 1) return;
    setPage((prevState) => prevState - 1);
    scrollTop();
  };

  return (
    <div className="flex flex-row gap-3 justify-center items-center py-4 px-2 text-2xl">
      <button
        className="transition-all hover:text-[#1E90FF] duration-700"
        onClick={() => handleFirstPage()}
      >
        First
      </button>
      <button
        className="transition-all hover:text-[#1E90FF] duration-700"
        onClick={() => handlePrevPage()}
      >
        Prev
      </button>
      <p>
        {page} of {lastPage}
      </p>
      <button
        className="transition-all hover:text-[#1E90FF] duration-700"
        onClick={() => handleNextPage()}
      >
        Next
      </button>
      <button
        className="transition-all hover:text-[#1E90FF] duration-700"
        onClick={() => handleLastPage()}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
