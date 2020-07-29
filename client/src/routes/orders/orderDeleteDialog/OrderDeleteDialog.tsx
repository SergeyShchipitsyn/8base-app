import React, { useCallback } from 'react';
import { pathOr } from 'ramda';
import { useMutation } from '@apollo/react-hooks';

import { Dialog } from '../../../components/dialog';
import { Button } from '../../../components/button';

import { ORDER_DELETE_MUTATION } from '../graphql';

import { Order, OrderDeleteMutationResponse, OrderDeleteMutationVariables } from "../types";


type OrderDeleteDialogProps = {
  onClose: (dialogId: string) => void
  isOpen: boolean
  order?: Order
};

export const ORDER_DELETE_DIALOG_ID = 'ORDER_DELETE_DIALOG_ID';

const OrderDeleteDialog: React.FC<OrderDeleteDialogProps> = ({ onClose, isOpen, order }) => {
  const [deleteOrder] = useMutation<OrderDeleteMutationResponse, OrderDeleteMutationVariables>(
    ORDER_DELETE_MUTATION,
    {
      variables: { data: { id: pathOr('', ['id'], order) } },
      refetchQueries: ['OrdersList']
    }
  );

  const handleClose = useCallback(() => {
    onClose(ORDER_DELETE_DIALOG_ID)
  }, [onClose]);

  function handleDeleteOrder(): void {
    deleteOrder();
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog title='Delete order' onClose={handleClose}>
      <div>
        <div>{`Are you sure you want to delete the order ${pathOr('', ['name'], order)}, ${pathOr('', ['id'], order)}?`}</div>
        <div>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteOrder}>Delete</Button>
        </div>
      </div>
    </Dialog>
  );
};

export { OrderDeleteDialog };
