import React, { useState, useCallback } from 'react';

import { ProductsList } from './productsList';
import { ProductCreateDialog } from './productCreateDialog';
import { ProductDeleteDialog } from './productDeleteDialog';
import { Button } from '../../components/button';

import { useDocumentTitle } from '../../hooks/useTitle';
import { PRODUCT_CREATE_DIALOG_ID } from './productCreateDialog/mocks';
import { PRODUCT_DELETE_DIALOG_ID } from './productDeleteDialog/ProductDeleteDialog';

import { Product } from './types';


const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [dialogState, setDialogState] = useState<Record<string, boolean>>({
    [PRODUCT_CREATE_DIALOG_ID]: false,
    [PRODUCT_DELETE_DIALOG_ID]: false
  });

  useDocumentTitle('Products')

  const openDialog = useCallback((dialogId: string): void => {
    setDialogState({
      ...dialogState,
      [dialogId]: true
    })
  }, [dialogState]);

  const onClose = useCallback((dialogId: string): void => {
    setDialogState({
      ...dialogState,
      [dialogId]: false
    });

    if (selectedProduct) {
      setSelectedProduct(undefined)
    }
  }, [selectedProduct, dialogState]);

  const handleOpenDeleteDialog = useCallback((product: Product) => {
    setSelectedProduct(product)
    openDialog(PRODUCT_DELETE_DIALOG_ID)
  }, [openDialog])

  const handleOpenEditDialog = useCallback((product: Product) => {
    setSelectedProduct(product)
    openDialog(PRODUCT_CREATE_DIALOG_ID)
  }, [openDialog])

  return (
    <div>
        <ProductsList
          onDeleteDialogOpen={handleOpenDeleteDialog}
          onEditDialogOpen={handleOpenEditDialog}
        />

        <Button onClick={() => openDialog(PRODUCT_CREATE_DIALOG_ID)}>
          Create new product
        </Button>

        <ProductCreateDialog
          isOpen={dialogState[PRODUCT_CREATE_DIALOG_ID]}
          onClose={onClose}
          product={selectedProduct}
        />
        <ProductDeleteDialog
          isOpen={dialogState[PRODUCT_DELETE_DIALOG_ID]}
          onClose={onClose}
          product={selectedProduct}
        />
    </div>
  );
};

export { Products };