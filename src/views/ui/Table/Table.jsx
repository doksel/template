import React from "react";
import {
  useTable,
  useGroupBy,
  useFilters,
  useSortBy,
  useExpanded,
  usePagination
} from "react-table";
import Loader from "../../../views/components/Loader/Loader";

import cm from "classnames";
import s from "./Table.module.less";

const TableUI = ({ columns, data, isHeader, isPagination }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, sortBy }
  } = useTable(
    {
      columns,
      data
    },
    useSortBy,
    usePagination
  );

  const newHeaderGroups = isHeader ? headerGroups : [headerGroups[1]];

  return (
    <>
      <div className={s.table}>
        <table {...getTableProps()}>
          <thead>
            {newHeaderGroups.map(headerGroup => (
              <tr>
                {headerGroup.headers.map(column => {
                  return (
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
                  );
                })}
              </tr>
            ))}
          </thead>
          {data.length ? (
            <tbody {...getTableBodyProps()}>
              {isPagination
                ? page.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                          return (
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                : rows.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                          return (
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
            </tbody>
          ) : (
            <tbody>
              <Loader />
            </tbody>
          )}
        </table>
      </div>
      {isPagination && (
        <div className={s.wrap_pagination}>
          <div className={s.pagination}>
            <button
              className={cm(s.arrow, s.primary, {
                [s.disabled]: !canPreviousPage
              })}
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {"<<"}
            </button>{" "}
            <button
              className={cm(s.arrow, s.primary, {
                [s.disabled]: !canPreviousPage
              })}
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {"<"}
            </button>{" "}
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <button
              className={cm(s.arrow, s.primary, {
                [s.disabled]: !canNextPage
              })}
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              {">"}
            </button>{" "}
            <button
              className={cm(s.arrow, s.primary, {
                [s.disabled]: !canNextPage
              })}
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>{" "}
            <span>
              Go to page:{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ width: "100px" }}
              />
            </span>{" "}
            <select
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[1, 2, 3, 4, 5].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </>
  );
};

export default TableUI;
