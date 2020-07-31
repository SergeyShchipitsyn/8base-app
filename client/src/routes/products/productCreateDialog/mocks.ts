import { Field } from '../../../shared/types/forms';

export const PRODUCT_CREATE_DIALOG_ID = 'PRODUCT_CREATE_DIALOG_ID';

export const productCreateFields: Field[] = [
  {
    label: 'Name',
    name: 'name',
  },
  {
    label: 'Price',
    name: 'price'
  },
  {
    label: 'Available Amount',
    name: 'availableAmount'
  },
  {
    label: 'Best Before',
    name: 'bestBefore',
    placeholder: 'DD-MM-YYYY'
  },
  {
    label: 'Description',
    name: 'description',
    optional: true
  }
];

export const initialFieldsState = {
  name: '',
  price: 0,
  availableAmount: 0,
  bestBefore: '10-10-2020',
  description: ''
};
