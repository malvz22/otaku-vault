import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

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
    if (page === lastPage) return;
    setPage(lastPage);
    scrollTop();
  };
  const handleFirstPage = () => {
    if (page === 1) return;
    setPage(1);
    scrollTop();
  };
  const handlePrevPage = () => {
    if (page === 1) return;
    setPage((prevState) => prevState - 1);
    scrollTop();
  };

  return (
    <div className="flex flex-row gap-2 justify-center items-center py-4 px-2 text-2xl">
      <button
        className={`transition-all hover:text-[#1E90FF] duration-700 text-4xl ${
          page === 1 ? `opacity-50` : `opacity-100`
        }`}
        onClick={() => handleFirstPage()}
      >
        <MdKeyboardDoubleArrowLeft />
      </button>
      <button
        className={`transition-all hover:text-[#1E90FF] duration-700 text-4xl ${
          page === 1 ? `opacity-50` : `opacity-100`
        }`}
        onClick={() => handlePrevPage()}
      >
        <MdKeyboardArrowLeft />
      </button>
      <p>
        {page} of {lastPage}
      </p>
      <button
        className={`transition-all hover:text-[#1E90FF] duration-700 text-4xl ${
          page === lastPage ? `opacity-50` : `opacity-100`
        }`}
        onClick={() => handleNextPage()}
      >
        <MdKeyboardArrowRight />
      </button>
      <button
        className={`transition-all hover:text-[#1E90FF] duration-700 text-4xl ${
          page === lastPage ? `opacity-50` : `opacity-100`
        }`}
        onClick={() => handleLastPage()}
      >
        <MdKeyboardDoubleArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
