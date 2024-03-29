import React from 'react';
const Pagination = ({ pagination, totalList, listPerPage, currentPage }) => {
  const pageNumber = [];
  const totalPage = Math.ceil(totalList / listPerPage);
  for (let i = 1; i <= totalPage; i++) {
    pageNumber.push(i);
  }

  // page decrement
  const PageDecrease = () => {
    if (currentPage > 1) {
      pagination(currentPage - 1);
    }
  };
  const PageDecreaseDouble = () => {
    if (currentPage === totalPage) {
      pagination(currentPage - 2);
    }
  };

  // page increment
  const PageIncrease = () => {
    if (currentPage < pageNumber.length) {
      pagination(currentPage + 1);
    }
  };
  const PageIncreaseDouble = () => {
    if (currentPage < totalPage - 1) {
      pagination(currentPage + 2);
    }
  };

  return (
    <div className="pagination">
      {pageNumber.length > 4 && (
        <ul>
          <li
            className={currentPage > 1 ? '' : 'disabledPagination'}
            onClick={PageDecrease}
          >
            {'<'}
          </li>

          <li
            onClick={() =>
              pagination(
                currentPage === totalPage
                  ? currentPage - totalPage + 1
                  : currentPage
              )
            }
          >
            {currentPage === totalPage
              ? currentPage - totalPage + 1
              : currentPage}
          </li>
          {currentPage === totalPage ? (
            <li onClick={() => PageDecreaseDouble()}>...</li>
          ) : null}
          <li
            onClick={() =>
              pagination(
                currentPage >= totalPage ? currentPage - 1 : currentPage + 1
              )
            }
          >
            {currentPage >= totalPage ? currentPage - 1 : currentPage + 1}
          </li>

          {currentPage < totalPage ? (
            <li onClick={() => PageIncreaseDouble()}>...</li>
          ) : null}

          <li onClick={() => pagination(totalPage)}>{totalPage}</li>

          <li
            className={currentPage >= totalPage ? 'disabledPagination' : ''}
            onClick={PageIncrease}
          >
            {'>'}
          </li>
          {/* {pageNumber.map((pageNumber) => (
          <li onClick={() => pagination(pageNumber)} key={pageNumber}>
            {pageNumber}
          </li>
        ))} */}
        </ul>
      )}
    </div>
  );
};
export default Pagination;
