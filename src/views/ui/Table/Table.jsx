import React from "react";
import {
  useTable,
  useGroupBy,
  useFilters,
  useSortBy,
  useExpanded,
  usePagination
} from "react-table";

import s from "./Table.module.less";

const Table = ({ columns, data, withoutHeader }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data
    },
    useSortBy
  );
  return (
    <div className={s.table}>
      <table {...getTableProps()} className={withoutHeader && s.withoutHeader}>
        <thead>
          {headerGroups.map(headerGroup => {
            console.log(headerGroups);
            console.log(headerGroup);

            return (
              <tr>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(
                      column.isSorting && column.getSortByToggleProps()
                    )}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
