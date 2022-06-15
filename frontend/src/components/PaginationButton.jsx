import React from "react";
import { useDispatch } from "react-redux";
import { setUserQuery } from "../slices/doctorsSlice";

const PaginationButton = ({ title, currentPage }) => {
  const textColor = title === currentPage ? 'text-blue-500' : 'text-gray-500'
  const dispatch = useDispatch()
  return (
    <button
      onClick={() =>
        dispatch(
          setUserQuery({
            pagination: {
              page: title,
            },
            sort: ["createdAt:desc"],
          })
        )
      }
      className={`bg-white border-gray-300 ${textColor} hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
    >
      {title}
    </button>
  );
};

export default PaginationButton;
