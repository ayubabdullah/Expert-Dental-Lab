import React from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setUserQuery } from "../slices/doctorsSlice";
import PaginationButton from "./PaginationButton";

const Pagination = ({ pagination }) => {
  const dispatch = useDispatch();
  const { page, pageSize, pageCount, total } = pagination;
  const firstItem = pageSize * page - (pageSize - 1) || 1;
  let lastItem;
  if (pageSize > total) {
    lastItem = total;
  } else {
    lastItem = pageSize * page || 1;
  }

  let renderPagination = [];

  for (let i = 1; i <= pageCount; i++) {
    renderPagination.push(
      <PaginationButton key={i} title={i} currentPage={page} />
    );
  }

  const onNextClick = () => {
    if (page < pageCount) {
      dispatch(
        setUserQuery({
          pagination: {
            page: page + 1,
          },
          sort: ["createdAt:desc"],
        })
      );
    }
    return;
  };
  const onPreviousClick = () => {
    if (page > 1) {
      dispatch(
        setUserQuery({
          pagination: {
            page: page - 1,
          },
          sort: ["createdAt:desc"],
        })
      );
    }
    return;
  };
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <Link
          to="#"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </Link>
        <Link
          to="#"
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </Link>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{firstItem}</span> to
            <span className="font-medium ml-1">{lastItem}</span> of
            <span className="font-medium ml-1">{total}</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={onPreviousClick}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <FcPrevious className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            {renderPagination}
            <button
              onClick={onNextClick}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <FcNext className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
