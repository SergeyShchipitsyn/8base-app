import React, { useState, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { pathOr } from 'ramda';

import { Table } from '../../../components/table';

import { CLIENTS_LIST_QUERY } from '../graphql';
import { clientColumns } from './mocks';
import { clientsListSelector } from './helpers';

import { ClientsListQueryResponse, Client } from '../types';
import { FetchData } from '../../../components/table/Table';

import styles from './ClientsList.module.css';


type ClientsListProps = {
  onEditDialogOpen: (product: Client) => void
  onDeleteDialogOpen: (product: Client) => void
}

const ClientsList: React.FC<ClientsListProps> = ({
  onEditDialogOpen,
  onDeleteDialogOpen,
}) => {
  const [requestVariables, setRequestVariables] = useState<FetchData | null>(null);
  const { loading, data } = useQuery<ClientsListQueryResponse>(CLIENTS_LIST_QUERY, {
    variables: {
      first: requestVariables?.pageSize ?? 20,
      skip: requestVariables ? requestVariables?.pageIndex * requestVariables?.pageSize : 0
    }
  });
  const clients = clientsListSelector(pathOr([], ['clientsList', 'items'], data));

  const fetchData = useCallback((params: FetchData) => {
    setRequestVariables(params)
  }, []);

  const handleOpenEditDialog = useCallback((clientId: string) => {
    const selectedClient = pathOr<Client[]>([], ['clientsList', 'items'], data)
      .find(client => client.id === clientId) as Client

    onEditDialogOpen(selectedClient)
  }, [data, onEditDialogOpen])

  const handleOpenDeleteDialog = useCallback((clientId: string) => {
    const selectedClient = pathOr<Client[]>([], ['clientsList', 'items'], data)
      .find(client => client.id === clientId) as Client

    onDeleteDialogOpen(selectedClient)
  }, [data, onDeleteDialogOpen])

  return (
    <div className={styles.wrapper}>
      <h3 className="m-0">Clients</h3>
      <Table
        columns={clientColumns}
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