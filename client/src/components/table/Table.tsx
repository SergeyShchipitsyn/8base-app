import React, { useEffect } from 'react';
import { useTable, Column, usePagination, useBlockLayout } from 'react-table';

import styles from './Table.module.css';
import { Pagination } from './pagination';
import { INITIAL_PAGE_SIZE } from './pagination/Pagination';


type TableProps<T = any> = {
  columns: Column[],
  data: T[]
  loading?: boolean
  fetchData: ({ pageIndex, pageSize }: FetchData) => void
  onEditDialogOpen?: (rowId: string) => void
  onDeleteDialogOpen?: (rowId: string) => void
};

export type FetchData = {
  pageIndex: number
  pageSize: number
}

// Simple table from react-table, nothing to see here...
const Table: React.FC<TableProps> = (
  {
    columns,
    data,
    fetchData,
    onEditDialogOpen = () => {},
    onDeleteDialogOpen = () => {}
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
      initialState: { pageSize: INITIAL_PAGE_SIZE },
      getRowId: (row: any) => row.id,
      onEditDialogOpen,
      onDeleteDialogOpen
    },
    useBlockLayout,
    usePagination
  )
  const totalCount = data.length
  const shownOnCurrentPage = rows.length

  useEffect(() => {
    fetchData({ pageIndex, pageSize })
  }, [pageIndex, pageSize, fetchData])

  return (
    <div {...getTableProps()}>

      <div>
        {headerGroups.map(headerGroup => (
          <div {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <div {...column.getHeaderProps()} className={styles.th}>{column.render('Header')}</div>
            ))}
          </div>
        ))}
      </div>

      <div {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <div {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <div
                    {...cell.getCellProps()}
                    className={styles.td}
                  >
                    {cell.render('Cell')}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

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
    </div>
  )
};

export { Table };