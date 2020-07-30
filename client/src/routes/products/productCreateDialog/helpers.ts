import { FormState, ReducerAction } from './types';
import { Product } from '../types';

import { initialFieldsState } from './mocks';
import { isValidDate } from '../../../helpers/isValid';


export function formReducer(state: FormState, action: ReducerAction): FormState {
  return {
    ...state,
    [action.name]: action.payload
  }
};

export function getInitialState(product?: Product): FormState {
  if (!product) {
    return initialFieldsState
  }

  return {
    ...product,
    description: product.description ?? ""
  }
}

export function getVariablesFromState(state: FormState) {
  return {
    ...state,
    price: Number(state.price),
    availableAmount: Number(state.availableAmount),
    bestBefore: getDate(state.bestBefore)
  }
};

function getDate(value: string): string {
  return isValidDate(value) ? new Date(value).toISOString().substring(0, 10) : String(Date.now())
}
