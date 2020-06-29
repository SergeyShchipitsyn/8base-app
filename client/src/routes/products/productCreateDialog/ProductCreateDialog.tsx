import React, { Fragment, useReducer, useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Dialog } from '../../../components/dialog';
import { Button } from '../../../components/button';
import { Input } from '../../../components/input';

import { PRODUCT_CREATE_MUTATION } from '../graphql';
import { productCreateFields, initialFieldsState, PRODUCT_CREATE_DIALOG_ID } from './mocks';
import { formReducer, getVariablesFromState } from './helpers';

import { ProductCreateMutationResponse, ProductCreateMutationVariables } from '../types';

import styles from './ProductCreateDialog.module.css';


type ProductsCreateDialogProps = {
  onClose: (dialogId: string) => void
  isOpen: boolean
}

// TODO: add validation for date / number fields, string length, etc
const ProductCreateDialog: React.FC<ProductsCreateDialogProps> = ({ onClose, isOpen }) => {
  const [state, dispatch] = useReducer(formReducer, initialFieldsState)
  const [createProduct] = useMutation<ProductCreateMutationResponse, ProductCreateMutationVariables>(
    PRODUCT_CREATE_MUTATION,
    {
      variables: { data: getVariablesFromState(state) },
      refetchQueries: ['ProductsList']
    }
  );

  const handleClose = useCallback(() => {
    onClose(PRODUCT_CREATE_DIALOG_ID)
  }, [onClose]);

  function handleInputChange(inputName: string, event: React.ChangeEvent<HTMLInputElement>): void {
    dispatch({
      name: inputName,
      payload: event.currentTarget.value
    })
  };

  function handleCreateProduct(): void {
    createProduct();
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog title="Create product" onClose={handleClose}>
      <div className={styles.content}>
        {productCreateFields.map(field => (
          <Fragment key={field.name}>
            <label htmlFor={field.name}>
              {field.label} {field.optional && ' (optional)'}
            </label>
            <Input
              id={field.name}
              name={field.name}
              placeholder={field.label}
              value={(state as Record<string, string | number>)[field.name]}
              onChange={event => handleInputChange(field.name, event)}
            />
          </Fragment>
        ))}
        <div className={styles.footerButtons}>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleCreateProduct}>
            Create new product
          </Button>
        </div>

      </div>
    </Dialog>
  );
};

export { ProductCreateDialog };
