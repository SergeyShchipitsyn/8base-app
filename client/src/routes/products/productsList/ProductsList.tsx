import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { pathOr } from 'ramda';

import { Table } from '../../../components/table';

import { PRODUCTS_LIST_QUERY } from '../graphql';
import { productColumns } from './mocks';
import { productsListSelector } from './helpers';

import { ProductListQueryResponse, Product } from '../types';


type ProductListProps = {
  onProductSelect: (product: Product) => void
}

const ProductsList: React.FC<ProductListProps> = ({ onProductSelect }) => {
  const { loading, data } = useQuery<ProductListQueryResponse>(PRODUCTS_LIST_QUERY);
  const products = productsListSelector(pathOr([], ['productsList', 'items'], data));

  function handleProductSelect(productId: string): void {
    const selectedProduct = pathOr<Product[]>([], ['productsList', 'items'], data)
      .find(product => product.id === productId) as Product

    onProductSelect(selectedProduct)
  }

  return (
    <div>
      <header>Products</header>
      <Table
        columns={productColumns}
        data={products}
        loading={loading}
        onCellClick={handleProductSelect}
      />
    </div>
  );
};

export { ProductsList };