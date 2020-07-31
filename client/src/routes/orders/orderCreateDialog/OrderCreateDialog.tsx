import React, { Fragment, useReducer, useCallback, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { pathOr } from 'ramda';

import { Dialog } from '../../../components/dialog';
import { Button } from '../../../components/button';
import { Input } from '../../../components/input';
import { Select } from '../../../components/select';

import { ORDER_CREATE_MUTATION, ORDER_UPDATE_MUTATION } from '../graphql';
import { orderCreateFields, ORDER_CREATE_DIALOG_ID } from './mocks';
import {
  formReducer,
  getInitialState,
  OrderStatusOptions,
  getProductOptions,
  getClientsOptions
} from './helpers';
import { CLIENTS_LIST_QUERY } from '../../clients/graphql';
import { PRODUCTS_LIST_QUERY } from '../../products/graphql';

import { Field, FieldType } from '../../../shared/types/forms';
import { SelectOption } from '../../../components/select/Select';
import { OrderCreateMutationVariables, Order, OrderUpdateMutationVariables } from '../types';
import { ClientsListQueryResponse } from '../../clients/types';
import { ProductListQueryResponse } from '../../products/types';

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
          client: {
            connect: { id: state.client }
          },
          products: {
            connect: { id: state.products }
          }
        }
      },
      refetchQueries: ['OrdersList, ProductsList, ClientsList']
    }
  );
  const [updateOrder] = useMutation<Order, OrderUpdateMutationVariables>(
    ORDER_UPDATE_MUTATION,
    {
      variables: {
        data: {
          id: order?.id ?? "",
          client: {
            connect: { id: state.client }
          },
          products: {
            connect: { id: state.products }
          }
        }
      },
      refetchQueries: ['OrdersList, ProductsList, ClientsList']
    }
  );
  const { data: clients } = useQuery<ClientsListQueryResponse>(CLIENTS_LIST_QUERY, {
    variables: { first: 1000, skip: 0 }
  });
  const { data: products } = useQuery<ProductListQueryResponse>(PRODUCTS_LIST_QUERY, {
    variables: { first: 1000, skip: 0 }
  });
  const options = {
    status: OrderStatusOptions,
    client: getClientsOptions(pathOr([], ['clientsList', 'items'], clients)),
    products: getProductOptions(pathOr([], ['productsList', 'items'], products))
  }


  useEffect(() => {
    if (order) {
      const formState = {
        status: order.status,
        client: pathOr('', ['client', 'id'], order),
        products: pathOr('', ['products', 'items', '0', 'id'], order)
      }
      Object.entries(formState)
        .forEach(([key, value]: any) => dispatch({ name: key, payload: value }))
    }
  }, [order]);

  const handleClose = useCallback(() => {
    onClose(ORDER_CREATE_DIALOG_ID)
  }, [onClose]);

  function handleFieldChange(
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ): void {
    dispatch({
      name: fieldName,
      payload: event.currentTarget.value
    })
  };

  function handleSubmit(): void {
    if (!order) {
      createOrder();
      handleClose();
      return
    };

    updateOrder();
    handleClose();
  };

  function renderField(field: Field): React.ReactNode {
    switch (field.type) {
      case FieldType.INPUT:
        return (
          <Input
            id={field.name}
            name={field.name}
            placeholder={field.label}
            value={(state as Record<string, string | number>)[field.name]}
            onChange={event => handleFieldChange(field.name, event)}
          />
        );
      case FieldType.SELECT:
        return (
          <Select
            name={field.name}
            placeholder={field.label}
            options={(options as Record<string, SelectOption[]>)[field.name]}
            onChange={event => handleFieldChange(field.name, event)}
          />
        )
      default:
        return null;
    }
  }

  if (!isOpen) return null;

  return (
    <Dialog title={dialogTitle} onClose={handleClose}>
      <div className={styles.content}>
        {orderCreateFields.map(field => (
          <Fragment key={field.name}>
            <label htmlFor={field.name}>
              {field.label} {field.optional && ' (optional)'}
            </label>
            {renderField(field)}
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
