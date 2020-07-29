import { initialFieldsState } from './mocks';

export type Field = {
  name: string
  label: string
  optional?: boolean
  placeholder?: string
};

export type FormState = typeof initialFieldsState;

export type ReducerAction = {
  name: string
  payload: string
};