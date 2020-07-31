export type Product = {
  id: string
  name: string
  price: number
  availableAmount: number
  bestBefore: string
  description?: string
}

export type ProductListQueryResponse = {
  productsList: {
    items: Product[]
  }
};

export enum ProductTypes {
  FRUITS = 'FRUITS',
  VEGETABLES = 'VEGETABLES',
  MEAT = 'MEAT',
  FISH = 'FISH',
  MILK_PRODUCTS = 'MILK_PRODUCTS',
  OTHER = 'OTHER'
}

export type ProductCreateMutationVariables = { data: Omit<Product, 'id'> };
export type ProductUpdateMutationVariables = { data: Product };

export type ProductDeleteMutationResponse = { success: boolean };
export type ProductDeleteMutationVariables = { data: { id: string } };