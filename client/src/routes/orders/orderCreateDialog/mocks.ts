import { Field, FieldType } from '../../../shared/types/forms';
import { OrderStatus } from './../types';


export const ORDER_CREATE_DIALOG_ID = 'ORDER_CREATE_DIALOG_ID';

export const orderCreateFields: Field[] = [
  {
    label: 'Status',
    name: 'status',
    type: FieldType.SELECT
  },
  {
    label: 'Client',
    name: 'client',
    type: FieldType.SELECT
  },
  {
    label: 'Product',
    name: 'products',
    type: FieldType.SELECT
  }
];

export const initialFieldsState = {
  client: '',
  products: '',
  status: OrderStatus.PENDING
};
