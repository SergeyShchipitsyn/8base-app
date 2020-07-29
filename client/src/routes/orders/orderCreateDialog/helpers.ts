import { FormState, ReducerAction } from './types';
import { Order } from '../types';

import { initialFieldsState } from './mocks';


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
    ...order
  }
}
