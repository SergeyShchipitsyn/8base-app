import React from 'react';
import { useTable, Column, Cell, usePagination } from 'react-table';

import styles from './Table.module.css';
import { Pagination } from './pagination';
import { INITIAL_PAGE_SIZE } from './pagination/Pagination';


type TableProps<K extends keyof T = any, T = any> = {
  columns: Column[],
  data: T[]
  loading?: boolean
  onCellClick?: (cellValue: K) => void
};

// Simple table from react-table, nothing to see here...
const Table: React.FC<TableProps> = (
  {
    columns,
    data,
    onCellClick = () => {}
  }
) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: {
      pageIndex, pageSize
    }
  } = useTable(
    {
     columns,
     data,
     initialState: { pageSize: INITIAL_PAGE_SIZE }
    },
    usePagination
  )
  const totalCount = data.length
  const shownOnCurrentPage = rows.length

  function handleIdCellClick(cell: Cell): void {
    if (cell.column.id === 'id') {
      onCellClick(cell.value)
    }
  }

  return (
    <table {...getTableProps()}>

      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} className={styles.th}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    onClick={() => handleIdCellClick(cell)}
                    className={styles.td}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>

      <Pagination
        pageIndex={pageIndex}
        pageSize={pageSize}
        pageCount={pageCount}
        totalCount={totalCount}
        shownOnCurrentPage={shownOnCurrentPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        goToPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
        setPageSize={setPageSize}
      />
    </table>
  )
};

export { Table };