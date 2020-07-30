import React, { Fragment, useReducer, useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Dialog } from '../../../components/dialog';
import { Button } from '../../../components/button';
import { Input } from '../../../components/input';

import { CLIENT_CREATE_MUTATION, CLIENT_UPDATE_MUTATION } from '../graphql';
import { clientCreateFields, CLIENT_CREATE_DIALOG_ID } from './mocks';
import { formReducer, getInitialState, getVariablesFromState } from './helpers';

import { ClientCreateMutationVariables, Client, ClientUpdateMutationVariables } from '../types';

import styles from './ClientCreateDialog.module.css';


type ClientCreateDialogProps = {
  onClose: (dialogId: string) => void
  isOpen: boolean
  client?: Client
}

// TODO: add validation for date / number fields, string length, etc
const ClientCreateDialog: React.FC<ClientCreateDialogProps> = ({ onClose, isOpen, client }) => {
  const [state, dispatch] = useReducer(formReducer, getInitialState(client))
  const dialogTitle = client ? 'Update client' : 'Create new client'
  const [createClient] = useMutation<Client, ClientCreateMutationVariables>(
    CLIENT_CREATE_MUTATION,
    {
      variables: { data: getVariablesFromState(state) },
      refetchQueries: ['ClientsList']
    }
  );
  const [updateClient] = useMutation<Client, ClientUpdateMutationVariables>(
    CLIENT_UPDATE_MUTATION,
    {
      variables: { data: {
        id: client?.id ?? "",
        ...getVariablesFromState(state)
      } },
      refetchQueries: ['ClientsList']
    }
  );

  useEffect(() => {
    if (client) {
      const clientWithoutId = {
        ...client,
        id: undefined
      }
      Object.entries(clientWithoutId).forEach(([key, value]: any) => dispatch({ name: key, payload: value }))
    }
  }, [client])

  const handleClose = useCallback(() => {
    onClose(CLIENT_CREATE_DIALOG_ID)
  }, [onClose]);

  function handleInputChange(inputName: string, event: React.ChangeEvent<HTMLInputElement>): void {
    dispatch({
      name: inputName,
      payload: event.currentTarget.value
    })
  };

  function handleSubmit(): void {
    if (!client) {
      createClient();
      handleClose();
      return
    }

    updateClient();
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog title={dialogTitle} onClose={handleClose}>
      <div className={styles.content}>
        {clientCreateFields.map(field => (
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

export { ClientCreateDialog };
