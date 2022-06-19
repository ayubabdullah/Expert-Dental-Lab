import React from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import TableData from "./TableData";
import TableHeadCell from "./TableHeadCell";
import Pagination from "./Pagination";

const Table = ({
  data,
  tableTitle,
  onAddButtonClick,
  onEditButtonClick,
  onDeleteButtonClick,
  onSearchTermChange,
  searchTerm,
  addButtonTitle,
  tableHeaders,
  tableRows,
  onSearchSubmit,
  pagination,
}) => {
  const renderHeaders = tableHeaders.map((header) => {
    return <TableHeadCell key={header} title={header} />;
  });
  const renderRows = data.map((data) => {
    const renderRowData = tableRows.map((row) => {
      const list = row.split(".");
      if (list.length === 2) {
        return (
          <TableData key={row} title={data.attributes[list[0]][list[1]]} />
        );
      } else if (list.length === 3) {
        return (
          <TableData
            key={row}
            title={data.attributes[list[0]][list[1]][list[2]]}
          />
        );
      } else if (list.length === 4) {
        return (
          <TableData
            key={row}
            title={data.attributes[list[0]][list[1]][list[2]][list[3]]}
          />
        );
      }
      return <TableData key={row} title={data.attributes[row]} />;
    });
    return (
      <tr
        className="table-row odd:bg-white even:bg-blue-200 hover:font-semibold transition-all duration-500"
        key={data.id}
      >
        <TableData title={data.id} />
        {renderRowData}
        <TableData>
          <button
            onClick={() => onEditButtonClick(data)}
            className="bg-green-400 rounded-xl p-2 text-white mr-1"
          >
            <FiEdit />
          </button>
          <button
            onClick={() => onDeleteButtonClick(data.id)}
            className="bg-red-400 rounded-xl p-2 text-white"
          >
            <MdDeleteOutline />
          </button>
        </TableData>
      </tr>
    );
  });

  return (
    <section className="w-11/12 mx-auto space-y-5">
      <div className="flex justify-between items-center mt-5">
        <h2 className="text-2xl font-bold  ">{tableTitle}</h2>
        <form
          className="flex justify-between items-center "
          onSubmit={onSearchSubmit}
        >
          <input
            type="text"
            name="search"
            id="search"
            className="bg-gray-50 border-2 border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
            placeholder="Search..."
            onChange={(value) => onSearchTermChange(value.target.value)}
            value={searchTerm}
          />
        </form>

        <button
          onClick={onAddButtonClick}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-2xl"
        >
          {addButtonTitle}
        </button>
      </div>

      <div className="bg-white rounded-2xl p-4">
        <table className="table table-auto w-full">
          <thead className="table-header-group">
            <tr className="table-row ">{renderHeaders}</tr>
          </thead>
          <tbody className="table-row-group">{renderRows}</tbody>
        </table>
        <Pagination pagination={pagination} />
      </div>
    </section>
  );
};

export default Table;
