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

export type ProductCreateMutationResponse = Product;
export type ProductCreateMutationVariables = { data: Omit<Product, 'id'> };

export type ProductDeleteMutationResponse = { success: boolean };
export type ProductDeleteMutationVariables = { data: { id: string } };