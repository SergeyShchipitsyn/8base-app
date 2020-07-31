import { ReducerAction } from '../../../shared/types/forms';
import { FormState } from './types';
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
  const { name, price, availableAmount, bestBefore } = state;
  return {
    name,
    price: Number(price),
    availableAmount: Number(availableAmount),
    bestBefore: getDate(bestBefore)
  }
};

function getDate(value: string): string {
  return isValidDate(value) ? new Date(value).toISOString().substring(0, 10) : String(Date.now())
}
