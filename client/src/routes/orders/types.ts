import { Product } from '../products/types';
import { Client } from '../clients/types';


export type Order = {
  id: string
  status: OrderStatus
  client?: Client
  products: {
    items: Product[]
  }
}

export enum OrderStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export type OrdersListQueryResponse = {
  ordersList: {
    items: Order[]
  }
};


// export type OrderCreateMutationVariables = { data: Omit<Order, 'id'> };
// export type OrderUpdateMutationVariables = { data: Order };
export type OrderCreateMutationVariables = { data: any };
export type OrderUpdateMutationVariables = { data: any };

export type OrderDeleteMutationResponse = { success: boolean };
export type OrderDeleteMutationVariables = { data: { id: string } };