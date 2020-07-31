import { Field } from '../../../shared/types/forms';
import { OrderStatus } from './../types';


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
