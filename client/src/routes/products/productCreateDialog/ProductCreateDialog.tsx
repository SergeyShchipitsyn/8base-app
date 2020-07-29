import React, { Fragment, useReducer, useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Dialog } from '../../../components/dialog';
import { Button } from '../../../components/button';
import { Input } from '../../../components/input';

import { PRODUCT_CREATE_MUTATION, PRODUCT_UPDATE_MUTATION } from '../graphql';
import { productCreateFields, PRODUCT_CREATE_DIALOG_ID } from './mocks';
import { formReducer, getVariablesFromState, getInitialState } from './helpers';

import { ProductCreateMutationVariables, Product, ProductUpdateMutationVariables } from '../types';

import styles from './ProductCreateDialog.module.css';


type ProductsCreateDialogProps = {
  onClose: (dialogId: string) => void
  isOpen: boolean
  product?: Product
}

// TODO: add validation for date / number fields, string length, etc
const ProductCreateDialog: React.FC<ProductsCreateDialogProps> = ({ onClose, isOpen, product }) => {
  const [state, dispatch] = useReducer(formReducer, getInitialState(product))
  const dialogTitle = product ? 'Update product' : 'Create new product'
  const [createProduct] = useMutation<Product, ProductCreateMutationVariables>(
    PRODUCT_CREATE_MUTATION,
    {
      variables: { data: getVariablesFromState(state) },
      refetchQueries: ['ProductsList']
    }
  );
  const [updateProduct] = useMutation<Product, ProductUpdateMutationVariables>(
    PRODUCT_UPDATE_MUTATION,
    {
      variables: { data: {
        id: product?.id ?? "",
        ...getVariablesFromState(state)
      } },
      refetchQueries: ['ProductsList']
    }
  );

  useEffect(() => {
    if (product) {
      const productWithoutId = {
        ...product,
        id: undefined
      }
      Object.entries(productWithoutId).forEach(([key, value]: any) => dispatch({ name: key, payload: value }))
    }
  }, [product])

  const handleClose = useCallback(() => {
    onClose(PRODUCT_CREATE_DIALOG_ID)
  }, [onClose]);

  function handleInputChange(inputName: string, event: React.ChangeEvent<HTMLInputElement>): void {
    dispatch({
      name: inputName,
      payload: event.currentTarget.value
    })
  };

  function handleSubmit(): void {
    if (!product) {
      createProduct();
      handleClose();
      return
    }

    updateProduct();
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog title={dialogTitle} onClose={handleClose}>
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
          <Button onClick={handleSubmit}>
            {dialogTitle}
          </Button>
        </div>

      </div>
    </Dialog>
  );
};

export { ProductCreateDialog };
