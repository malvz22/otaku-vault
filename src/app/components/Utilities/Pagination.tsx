interface PaginationProps {
  page: number;
  lastPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({ page, lastPage, setPage }) => {
  const handleNextPage = () => {
    setPage((prevState) => prevState + 1);
  };
  const handlePrevPage = () => {
    setPage((prevState) => prevState - 1);
  };
  return (
    <div className="flex flex-row gap-3 justify-center items-center py-4 px-2 text-2xl">
      <button
        className="transition-all hover:text-[#1E90FF] duration-700"
        onClick={handlePrevPage}
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
    </div>
  );
};

export default Pagination;
