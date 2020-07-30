import { Order } from '../types';


export function ordersListSelector(data: Order[]) {
  return data.map(order => {
    return {
      ...order,
      clients: order.client?.email,
      products: order.products.items.map(product => product.name).join(', ')
    }
  })
};
