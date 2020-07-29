export type Client = {
  id: string
  email: string
  firstName: string
  lastName: string
  balance: number
  orders: Order[]
}

export type ClientsListQueryResponse = {
  productsList: {
    items: Client[]
  }
};

export type Order = any

export type ClientCreateMutationVariables = { data: Omit<Client, 'id'> };
export type ClientUpdateMutationVariables = { data: Client };

export type ClientDeleteMutationResponse = { success: boolean };
export type ClientDeleteMutationVariables = { data: { id: string } };