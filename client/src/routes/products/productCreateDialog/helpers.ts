import { FormState, ReducerAction } from './types';

export function formReducer(state: FormState, action: ReducerAction): FormState {
  return {
    ...state,
    [action.name]: action.payload
  }
};

export function getVariablesFromState(state: FormState) {
  return {
    ...state,
    price: Number(state.price), 
    availableAmount: Number(state.availableAmount),
    bestBefore: new Date(state.bestBefore).toISOString()
  }
};
