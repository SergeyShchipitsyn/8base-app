import gql from 'graphql-tag';


export const ORDERS_LIST_QUERY = gql`
  query OrdersList($first: Int, $skip: Int) {
    ordersList(first: $first, skip: $skip) {
      items {
        id
        status
        products {
          items {
            id
            name
          }
        }
        clients {
          items {
            id
            email
          }
        }
      }
    }
  }
`;

export const ORDER_CREATE_MUTATION = gql`
  mutation OrderCreate($data: OrderCreateInput!) {
    orderCreate(data: $data) {
      id
      status
      products {
        items {
          id
          name
        }
      }
      clients {
        items {
          id
          email
        }
      }
    }
  }
`;

export const ORDER_UPDATE_MUTATION = gql`
  mutation OrderUpdate($data: OrderUpdateInput!) {
    orderUpdate(data: $data) {
      id
      status
      products {
        items {
          id
          name
        }
      }
      clients {
        items {
          id
          email
        }
      }
    }
  }
`;

export const ORDER_DELETE_MUTATION = gql`
  mutation OrderDelete($id: ID!) {
    OrderDelete(data: { id: $id }) {
      success
    }
  }
`;
