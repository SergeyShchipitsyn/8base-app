import React, { useState, useCallback } from 'react';

import { ClientsList } from './ordersList';
import { OrderCreateDialog } from './orderCreateDialog';
import { OrderDeleteDialog } from './orderDeleteDialog';
import { Button } from '../../components/button';

import { useDocumentTitle } from '../../hooks/useTitle';
import { ORDER_CREATE_DIALOG_ID } from './orderCreateDialog/mocks';
import { ORDER_DELETE_DIALOG_ID } from './orderDeleteDialog/OrderDeleteDialog';

import { Order } from './types';


const Orders: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(undefined);
  const [dialogState, setDialogState] = useState<Record<string, boolean>>({
    [ORDER_CREATE_DIALOG_ID]: false,
    [ORDER_DELETE_DIALOG_ID]: false
  });

  useDocumentTitle('Orders')

  const openDialog = useCallback((dialogId: string): void => {
    setDialogState({
      ...dialogState,
      [dialogId]: true
    })
  }, [dialogState]);

  const onClose = useCallback((dialogId: string): void => {
    setDialogState({
      ...dialogState,
      [dialogId]: false
    });

    if (selectedOrder) {
      setSelectedOrder(undefined)
    }
  }, [selectedOrder, dialogState]);

  const handleOpenDeleteDialog = useCallback((order: Order) => {
    setSelectedOrder(order)
    openDialog(ORDER_DELETE_DIALOG_ID)
  }, [openDialog])

  const handleOpenEditDialog = useCallback((order: Order) => {
    setSelectedOrder(order)
    openDialog(ORDER_CREATE_DIALOG_ID)
  }, [openDialog])

  return (
    <div className="w-100">
        <h4 className="m-0 pb-16">Orders</h4>
        <ClientsList
          onDeleteDialogOpen={handleOpenDeleteDialog}
          onEditDialogOpen={handleOpenEditDialog}
        />

        <Button onClick={() => openDialog(ORDER_CREATE_DIALOG_ID)}>
          Create new order
        </Button>

        <OrderCreateDialog
          isOpen={dialogState[ORDER_CREATE_DIALOG_ID]}
          onClose={onClose}
          order={selectedOrder}
        />
        <OrderDeleteDialog
          isOpen={dialogState[ORDER_DELETE_DIALOG_ID]}
          onClose={onClose}
          order={selectedOrder}
        />
    </div>
  );
};

export { Orders };