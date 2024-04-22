import "../../styles/pagination.scss"

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handleClick = (number) => {
    onPageChange(number);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <ul className="pagination">
      {pageNumbers.map((number) => (
        <li key={number} className={number === currentPage ? "active" : ""}>
          <button onClick={() => handleClick(number)}>
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
