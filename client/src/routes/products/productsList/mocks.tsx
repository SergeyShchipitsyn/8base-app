import React from 'react';
import { CellProps } from 'react-table';

import { ActionsCell } from '../../../components/table/actionsCell';


export const productColumns = [
  {
    Header: 'ID',
    accessor: 'id'
  },
  {
    Header: 'Name',
    accessor: 'name'
  },
  {
    Header: 'Price',
    accessor: 'price'
  },
  {
    Header: 'Available Amount',
    accessor: 'availableAmount'
  },
  {
    Header: 'Best Before',
    accessor: 'bestBefore'
  },
  {
    Header: 'Description',
    accessor: 'description'
  },
  {
    Header: '',
    Cell: ({ row, onEditDialogOpen, onDeleteDialogOpen }: CellProps<any>) => (
      <ActionsCell
        row={row}
        onEditDialogOpen={onEditDialogOpen}
        onDeleteDialogOpen={onDeleteDialogOpen}
      />
    ),
    accessor: 'actionsCell',
  }
];
