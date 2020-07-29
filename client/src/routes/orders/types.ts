import { Product } from '../products/types';
import { Client } from '../clients/types';


export type Order = {
  id: string
  status: OrderStatus
  clients: {
    items: Client[]
  }
  products: {
    items: Product[]
  }
}

export enum OrderStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'inProgress',
  DONE = 'done'
}

export type OrdersListQueryResponse = {
  ordersList: {
    items: Order[]
  }
};

export type OrderCreateMutationVariables = { data: Omit<Order, 'id'> };
export type OrderUpdateMutationVariables = { data: Order };

export type OrderDeleteMutationResponse = { success: boolean };
export type OrderDeleteMutationVariables = { data: { id: string } };