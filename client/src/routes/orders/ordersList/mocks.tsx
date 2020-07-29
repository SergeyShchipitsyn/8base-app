import React from 'react';
import { CellProps } from 'react-table';

import { ActionsCell } from '../../../components/table/actionsCell';


export const orderColumns = [
  {
    Header: 'ID',
    accessor: 'id'
  },
  {
    Header: 'Status',
    accessor: 'status'
  },
  {
    Header: 'Clients',
    accessor: 'clients'
  },
  {
    Header: 'Products',
    accessor: 'products'
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
