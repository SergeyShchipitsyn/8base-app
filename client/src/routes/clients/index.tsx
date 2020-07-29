import React, { useState, useCallback } from 'react';

import { ClientsList } from './clientsList';
import { ClientCreateDialog } from './clientCreateDialog';
import { ClientDeleteDialog } from './clientDeleteDialog';
import { Button } from '../../components/button';

import { useDocumentTitle } from '../../hooks/useTitle';
import { CLIENT_CREATE_DIALOG_ID } from './clientCreateDialog/mocks';
import { CLIENT_DELETE_DIALOG_ID } from './clientDeleteDialog/ClientDeleteDialog';

import { Client } from './types';


const Clients: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState<Client | undefined>(undefined);
  const [dialogState, setDialogState] = useState<Record<string, boolean>>({
    [CLIENT_CREATE_DIALOG_ID]: false,
    [CLIENT_DELETE_DIALOG_ID]: false
  });

  useDocumentTitle('Clients')

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

    if (selectedClient) {
      setSelectedClient(undefined)
    }
  }, [selectedClient, dialogState]);

  const handleOpenDeleteDialog = useCallback((client: Client) => {
    setSelectedClient(client)
    openDialog(CLIENT_DELETE_DIALOG_ID)
  }, [openDialog])

  const handleOpenEditDialog = useCallback((client: Client) => {
    setSelectedClient(client)
    openDialog(CLIENT_CREATE_DIALOG_ID)
  }, [openDialog])

  return (
    <div className="w-100">
        <h4 className="m-0 pb-16">Clients</h4>
        <ClientsList
          onDeleteDialogOpen={handleOpenDeleteDialog}
          onEditDialogOpen={handleOpenEditDialog}
        />

        <Button onClick={() => openDialog(CLIENT_CREATE_DIALOG_ID)}>
          Create new client
        </Button>

        <ClientCreateDialog
          isOpen={dialogState[CLIENT_CREATE_DIALOG_ID]}
          onClose={onClose}
          client={selectedClient}
        />
        <ClientDeleteDialog
          isOpen={dialogState[CLIENT_DELETE_DIALOG_ID]}
          onClose={onClose}
          client={selectedClient}
        />
    </div>
  );
};

export { Clients };