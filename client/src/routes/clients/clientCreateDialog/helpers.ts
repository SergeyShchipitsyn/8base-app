import { FormState, ReducerAction } from './types';
import { Client } from '../types';

import { initialFieldsState } from './mocks';


export function formReducer(state: FormState, action: ReducerAction): FormState {
  return {
    ...state,
    [action.name]: action.payload
  }
};

export function getInitialState(client?: Client): FormState {
  if (!client) {
    return initialFieldsState
  }

  return {
    ...client
  }
}
