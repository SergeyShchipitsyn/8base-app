import { Field } from './types';


export const CLIENT_CREATE_DIALOG_ID = 'CLIENT_CREATE_DIALOG_ID';

export const clientCreateFields: Field[] = [
  {
    label: 'Email',
    name: 'email',
  },
  {
    label: 'First Name',
    name: 'firstName'
  },
  {
    label: 'Last Name',
    name: 'lastName'
  },
  {
    label: 'Balance',
    name: 'balance'
  }
];

export const initialFieldsState = {
  email: '',
  firstName: '',
  lastName: '',
  balance: 0
};
