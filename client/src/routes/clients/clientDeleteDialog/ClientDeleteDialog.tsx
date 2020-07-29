import React, { useCallback } from 'react';
import { pathOr } from 'ramda';
import { useMutation } from '@apollo/react-hooks';

import { Dialog } from '../../../components/dialog';
import { Button } from '../../../components/button';

import { CLIENT_DELETE_MUTATION } from '../graphql';

import { Client, ClientDeleteMutationResponse, ClientDeleteMutationVariables } from "../types";


type ClientDeleteDialogProps = {
  onClose: (dialogId: string) => void
  isOpen: boolean
  client?: Client
};

export const CLIENT_DELETE_DIALOG_ID = 'CLIENT_DELETE_DIALOG_ID';

const ClientDeleteDialog: React.FC<ClientDeleteDialogProps> = ({ onClose, isOpen, client }) => {
  const [deleteClient] = useMutation<ClientDeleteMutationResponse, ClientDeleteMutationVariables>(
    CLIENT_DELETE_MUTATION,
    {
      variables: { data: { id: pathOr('', ['id'], client) } },
      refetchQueries: ['ClientsList']
    }
  );

  const handleClose = useCallback(() => {
    onClose(CLIENT_DELETE_DIALOG_ID)
  }, [onClose]);

  function handleDeleteClient(): void {
    deleteClient();
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog title="Delete client" onClose={handleClose}>
      <div>
        <div>{`Are you sure you want to delete the client ${pathOr('', ['name'], client)}, ${pathOr('', ['id'], client)}?`}</div>
        <div>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteClient}>Delete</Button>
        </div>
      </div>
    </Dialog>
  );
};

export { ClientDeleteDialog };
