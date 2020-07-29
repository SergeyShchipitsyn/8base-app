import { Client } from '../types';


export function clientsListSelector(data: Client[]) {
  return data.map(client => {
    return {
      ...client,
      orders: client.orders.items.map(order => order.id).join(', ')
    }
  })
};
