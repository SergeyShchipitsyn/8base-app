import { Product } from '../types';


export function productsListSelector(data: Product[]) {
  return data.map(product => {
    return {
      ...product,
      price: `$${product.price}`,
      bestBefore: new Date(product.bestBefore).toUTCString()
    }
  })
};
