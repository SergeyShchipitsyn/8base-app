import gql from 'graphql-tag';


export const PRODUCTS_LIST_QUERY = gql`
  query ProductsList($first: Int, $skip: Int) {
    productsList(first: $first, skip: $skip) {
      items {
        id
        name
        description
        price
        availableAmount
        bestBefore
      }
    }
  }
`;

export const PRODUCT_CREATE_MUTATION = gql`
  mutation ProductCreate($data: ProductCreateInput!) {
    productCreate(data: $data) {
      id
      name
      description
      price
      availableAmount
      bestBefore
    }
  }
`;

export const PRODUCT_UPDATE_MUTATION = gql`
  mutation ProductUpdate($data: ProductUpdateInput!) {
    productUpdate(data: $data) {
      id
      name
      description
      price
      availableAmount
      bestBefore
    }
  }
`;

export const PRODUCT_DELETE_MUTATION = gql`
  mutation ProductDelete($id: ID!) {
    productDelete(data: { id: $id }) {
      success
    }
  }
`;
