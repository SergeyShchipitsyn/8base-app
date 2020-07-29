import React, { useState, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { pathOr } from 'ramda';

import { Table } from '../../../components/table';

import { ORDERS_LIST_QUERY } from '../graphql';
import { orderColumns } from './mocks';
import { ordersListSelector } from './helpers';

import { OrdersListQueryResponse, Order } from '../types';
import { FetchData } from '../../../components/table/Table';

import styles from './OrdersList.module.css';


type OrdersListProps = {
  onEditDialogOpen: (order: Order) => void
  onDeleteDialogOpen: (order: Order) => void
}

const ClientsList: React.FC<OrdersListProps> = ({
  onEditDialogOpen,
  onDeleteDialogOpen,
}) => {
  const [requestVariables, setRequestVariables] = useState<FetchData | null>(null);
  const { loading, data } = useQuery<OrdersListQueryResponse>(ORDERS_LIST_QUERY, {
    variables: {
      first: requestVariables?.pageSize ?? 20,
      skip: requestVariables ? requestVariables?.pageIndex * requestVariables?.pageSize : 0
    }
  });
  const clients = ordersListSelector(pathOr([], ['ordersList', 'items'], data));

  const fetchData = useCallback((params: FetchData) => {
    setRequestVariables(params)
  }, []);

  const handleOpenEditDialog = useCallback((orderId: string) => {
    const selectedOrder = pathOr<Order[]>([], ['ordersList', 'items'], data)
      .find(client => client.id === orderId) as Order

    onEditDialogOpen(selectedOrder)
  }, [data, onEditDialogOpen])

  const handleOpenDeleteDialog = useCallback((clientId: string) => {
    const selectedOrder = pathOr<Order[]>([], ['ordersList', 'items'], data)
      .find(client => client.id === clientId) as Order

    onDeleteDialogOpen(selectedOrder)
  }, [data, onDeleteDialogOpen])

  return (
    <div className={styles.wrapper}>
      <h3 className="m-0">Orders</h3>
      <Table
        columns={orderColumns}
        data={clients}
        fetchData={fetchData}
        loading={loading}
        onEditDialogOpen={handleOpenEditDialog}
        onDeleteDialogOpen={handleOpenDeleteDialog}
      />
    </div>
  );
};

export { ClientsList };