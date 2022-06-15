import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserQuery, setUserQuery } from "../slices/doctorsSlice";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
const TableHeadCell = ({ title }) => {
  const [sort, setSort] = useState("asc");
  const dispatch = useDispatch();
  const userQuery = useSelector(getUserQuery);

  const icon = sort === "asc" ? <BsFillCaretDownFill /> : <BsFillCaretUpFill />;
  const onSortChange = () => {
    setSort((prev) => (prev === "asc" ? "desc" : "asc"));
    switch (title) {
      case "Doctor Name":
        dispatch(
          setUserQuery({ ...userQuery, sort: [`doctorName:${sort}`] })
        );
        break;
      case "Phone Number":
        dispatch(setUserQuery({ ...userQuery, sort: [`phone:${sort}`] }));
        break;
      case "Join At":
        dispatch(setUserQuery({ ...userQuery, sort: [`joinAt:${sort}`] }));
        break;
      case "Location":
        dispatch(setUserQuery({ ...userQuery, sort: [`location:${sort}`] }));
        break;
      case "Come By":
        dispatch(setUserQuery({ ...userQuery, sort: [`comeBy:${sort}`] }));
        break;

      default:
        break;
    }
  };

  return (
    <th className="table-cell justify-between items-center text-center border-b-2 py-3 ">
      <div className="flex items-center">
        {title === "Doctor Name" ||
        title === "Phone Number" ||
        title === "Location" ||
        title === "Join At" ||
        title === "Come By" ? (
          <button className="mr-1" onClick={onSortChange}>
            {icon}
          </button>
        ) : null}
        <p>{title}</p>
      </div>
    </th>
  );
};

export default TableHeadCell;
