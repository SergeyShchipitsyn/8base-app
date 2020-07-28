import React, { useCallback } from 'react';
import { pathOr } from 'ramda';
import { useMutation } from '@apollo/react-hooks';

import { Dialog } from '../../../components/dialog';
import { Button } from '../../../components/button';

import { PRODUCT_DELETE_MUTATION } from '../graphql';

import { Product, ProductDeleteMutationResponse, ProductDeleteMutationVariables } from "../types";


type ProductDeleteDialogProps = {
  onClose: (dialogId: string) => void
  isOpen: boolean
  product?: Product
};

export const PRODUCT_DELETE_DIALOG_ID = 'PRODUCT_DELETE_DIALOG_ID';

const ProductDeleteDialog: React.FC<ProductDeleteDialogProps> = ({ onClose, isOpen, product }) => {
  const [deleteProduct] = useMutation<ProductDeleteMutationResponse, ProductDeleteMutationVariables>(
    PRODUCT_DELETE_MUTATION,
    {
      variables: { data: { id: pathOr('', ['id'], product) } },
      refetchQueries: ['ProductsList']
    }
  );

  const handleClose = useCallback(() => {
    onClose(PRODUCT_DELETE_DIALOG_ID)
  }, [onClose]);

  function handleDeleteProduct(): void {
    deleteProduct();
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog title="Delete product" onClose={handleClose}>
      <div>
        <div>{`Are you sure you want to delete the product ${pathOr('', ['name'], product)}, ${pathOr('', ['id'], product)}?`}</div>
        <div>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteProduct}>Delete</Button>
        </div>
      </div>
    </Dialog>
  );
};

export { ProductDeleteDialog };
