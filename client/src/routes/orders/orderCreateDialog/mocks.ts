import { OrderStatus } from './../types';
import { Field } from './types';


export const ORDER_CREATE_DIALOG_ID = 'ORDER_CREATE_DIALOG_ID';

export const orderCreateFields: Field[] = [
  {
    label: 'Status',
    name: 'status',
  }
];

export const initialFieldsState = {
  status: OrderStatus.PENDING
};
