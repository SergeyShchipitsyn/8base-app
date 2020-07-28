import { PRODUCTS_LIST_QUERY } from '../../../../client/src/routes/products/graphql';


type ResolverResult = {
  data: {
    result: string
  }
};

export default async (event: any, ctx: any) : Promise<ResolverResult> => {
  const productsList = await ctx.api.gqlRequest(PRODUCTS_LIST_QUERY, {
    skip: 0,
    first: 1
  })

  const firstProduct = productsList?.items?.[0]

  if (firstProduct) {
    return {
      data: {
        result: `Promoted product for shop "id: ${event.data.shopId}" is ${firstProduct.name}`,
      },
    };
  }

  return {
    data: {
      result: `No promoted products for shop "id: ${event.data.shopId}"`,
    },
  };
};