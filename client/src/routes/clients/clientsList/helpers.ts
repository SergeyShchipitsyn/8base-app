import { Client } from '../types';


export function clientsListSelector(data: Client[]) {
  return data.map(client => {
    return {
      ...client
    }
  })
};
