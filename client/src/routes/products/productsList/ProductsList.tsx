import React, { useState, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { pathOr } from 'ramda';

import { Table } from '../../../components/table';

import { PRODUCTS_LIST_QUERY } from '../graphql';
import { productColumns } from './mocks';
import { productsListSelector } from './helpers';

import { ProductListQueryResponse, Product } from '../types';
import { FetchData } from '../../../components/table/Table';


type ProductListProps = {
  onProductSelect: (product: Product) => void
}

const ProductsList: React.FC<ProductListProps> = ({ onProductSelect }) => {
  const [requestVariables, setRequestVariables] = useState<FetchData | null>(null);
  const { loading, data } = useQuery<ProductListQueryResponse>(PRODUCTS_LIST_QUERY, {
    variables: {
      first: requestVariables?.pageSize ?? 20,
      skip: requestVariables ? requestVariables?.pageIndex * requestVariables?.pageSize : 0
    }
  });
  const products = productsListSelector(pathOr([], ['productsList', 'items'], data));

  const handleProductSelect = useCallback((productId: string): void  => {
    const selectedProduct = pathOr<Product[]>([], ['productsList', 'items'], data)
      .find(product => product.id === productId) as Product

    onProductSelect(selectedProduct)
  }, [data, onProductSelect]);

  const fetchData = useCallback((params: FetchData) => {
    setRequestVariables(params)
  }, []);

  return (
    <div>
      <header>Products</header>
      <Table
        columns={productColumns}
        data={products}
        fetchData={fetchData}
        loading={loading}
        onCellClick={handleProductSelect}
      />
    </div>
  );
};

export { ProductsList };