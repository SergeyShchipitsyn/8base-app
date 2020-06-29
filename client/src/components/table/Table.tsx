import React from 'react';
import { useTable, Column, Cell } from 'react-table';

import styles from './Table.module.css';


type TableProps<K extends keyof T = any, T = any> = {
  columns: Column[],
  data: T[]
  loading?: boolean
  onCellClick?: (cellValue: K) => void
};

// Simple table from react-table, nothing to see here...
const Table: React.FC<TableProps> = ({ columns, data, onCellClick = () => {} }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data,
  })

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
    </table>
  )
};

export { Table };