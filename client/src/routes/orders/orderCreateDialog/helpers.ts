import { initialFieldsState } from './mocks';

import { OrderStatus } from './../types';
import { ReducerAction } from '../../../shared/types/forms';
import { FormState } from './types';
import { Order } from '../types';
import { SelectOption } from '../../../components/select/Select';
import { Client } from '../../clients/types';
import { Product } from '../../products/types';


export function formReducer(state: FormState, action: ReducerAction): FormState {
  return {
    ...state,
    [action.name]: action.payload
  }
};

export function getInitialState(order?: Order): FormState {
  if (!order) {
    return initialFieldsState
  }

  return {
    status: order.status,
    client: order.client?.id ?? '',
    products: order.products.items[0].id
  }
};

export function getClientsOptions(clients: Client[]): SelectOption[] {
  return clients.map(client => ({
    label: `${client.firstName} ${client.lastName}, ${client.email}`,
    value: client.id
  }))
};

export function getProductOptions(products: Product[]): SelectOption[] {
  return products.map(product => ({
    label: product.name,
    value: product.id
  }))
};

export const OrderStatusOptions: SelectOption[] = Object.keys(OrderStatus).map(status => ({
  value: status,
  label: `${status[0].toLocaleUpperCase()}${status.slice(1)}`
}));

