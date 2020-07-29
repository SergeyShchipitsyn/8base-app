import React from 'react';
import { CellProps } from 'react-table';

import { ActionsCell } from '../../../components/table/actionsCell';


export const clientColumns = [
  {
    Header: 'ID',
    accessor: 'id'
  },
  {
    Header: 'First Name',
    accessor: 'firstName'
  },
  {
    Header: 'Last Name',
    accessor: 'lastName'
  },
  {
    Header: 'Balance',
    accessor: 'balance'
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
