import { Order } from '../types';


export function ordersListSelector(data: Order[]) {
  return data.map(order => {
    return {
      ...order,
      clients: order.clients.items.map(client => client.id).join(', '),
      products: order.products.items.map(product => product.name).join(', ')
    }
  })
};
