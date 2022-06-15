import React from 'react'

const TableData = ({ title, children }) => {
  return <td className="table-cell text-center py-2">{children ? children : title}</td>;
};

export default TableData