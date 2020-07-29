import { FormState, ReducerAction } from './types';
import { Product } from '../types';

import { initialFieldsState } from './mocks';


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
    bestBefore: new Date(state.bestBefore).toISOString()
  }
};
