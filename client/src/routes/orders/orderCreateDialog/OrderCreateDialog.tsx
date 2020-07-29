import React, { Fragment, useReducer, useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Dialog } from '../../../components/dialog';
import { Button } from '../../../components/button';
import { Input } from '../../../components/input';

import { ORDER_CREATE_MUTATION, ORDER_UPDATE_MUTATION } from '../graphql';
import { orderCreateFields, ORDER_CREATE_DIALOG_ID } from './mocks';
import { formReducer, getInitialState } from './helpers';

import { OrderCreateMutationVariables, Order, OrderUpdateMutationVariables } from '../types';

import styles from './OrderCreateDialog.module.css';


type OrderCreateDialogProps = {
  onClose: (dialogId: string) => void
  isOpen: boolean
  order?: Order
}

// TODO: add validation for date / number fields, string length, etc
const OrderCreateDialog: React.FC<OrderCreateDialogProps> = ({ onClose, isOpen, order }) => {
  const [state, dispatch] = useReducer(formReducer, getInitialState(order))
  const dialogTitle = order ? 'Update order' : 'Create new order'
  const [createOrder] = useMutation<Order, OrderCreateMutationVariables>(
    ORDER_CREATE_MUTATION,
    {
      variables: {
        data: {
          ...state,
          clients: {
            items: []
          },
          products: {
            items: []
          }
        }
      },
      refetchQueries: ['OrdersList']
    }
  );
  const [updateOrder] = useMutation<Order, OrderUpdateMutationVariables>(
    ORDER_UPDATE_MUTATION,
    {
      variables: {
        data: {
          id: order?.id ?? "",
          clients: {
            items: []
          },
          products: {
            items: []
          },
          ...state
        }
      },
      refetchQueries: ['OrdersList']
    }
  );

  useEffect(() => {
    if (order) {
      const orderWithoutId = {
        ...order,
        id: undefined
      }
      Object.entries(orderWithoutId).forEach(([key, value]: any) => dispatch({ name: key, payload: value }))
    }
  }, [order])

  const handleClose = useCallback(() => {
    onClose(ORDER_CREATE_DIALOG_ID)
  }, [onClose]);

  function handleInputChange(inputName: string, event: React.ChangeEvent<HTMLInputElement>): void {
    dispatch({
      name: inputName,
      payload: event.currentTarget.value
    })
  };

  function handleSubmit(): void {
    if (!order) {
      createOrder();
      handleClose();
      return
    }

    updateOrder();
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog title={dialogTitle} onClose={handleClose}>
      <div className={styles.content}>
        {orderCreateFields.map(field => (
          <Fragment key={field.name}>
            <label htmlFor={field.name}>
              {field.label} {field.optional && ' (optional)'}
            </label>
            <Input
              id={field.name}
              name={field.name}
              placeholder={field.label}
              value={(state as Record<string, string | number>)[field.name]}
              onChange={event => handleInputChange(field.name, event)}
            />
          </Fragment>
        ))}
        <div className={styles.footerButtons}>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {dialogTitle}
          </Button>
        </div>

      </div>
    </Dialog>
  );
};

export { OrderCreateDialog };
