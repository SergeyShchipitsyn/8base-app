import gql from 'graphql-tag';


export const CLIENTS_LIST_QUERY = gql`
  query ClientsList($first: Int, $skip: Int) {
    clientsList(first: $first, skip: $skip) {
      items {
        id
        email
        firstName
        lastName
        balance
        orders {
          items {
            id
          }
        }
      }
    }
  }
`;

export const CLIENT_CREATE_MUTATION = gql`
  mutation ClientCreate($data: ClientCreateInput!) {
    clientCreate(data: $data) {
      id
      email
      firstName
      lastName
      balance
      orders {
        items {
          id
        }
      }
    }
  }
`;

export const CLIENT_UPDATE_MUTATION = gql`
  mutation ClientUpdate($data: ClientUpdateInput!) {
    clientUpdate(data: $data) {
      id
      email
      firstName
      lastName
      balance
      orders {
        items {
          id
        }
      }
    }
  }
`;

export const CLIENT_DELETE_MUTATION = gql`
  mutation ClientDelete($id: ID!) {
    clientDelete(data: { id: $id }) {
      success
    }
  }
`;
