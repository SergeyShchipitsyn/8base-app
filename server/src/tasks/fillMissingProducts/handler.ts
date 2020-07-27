import { PRODUCT_UPDATE_BY_FILTER_MUTATION } from './../../../../client/src/routes/products/graphql';


export default async (event: any, ctx: any): Promise<void> => {
  try {
    await ctx.api.gqlRequest(PRODUCT_UPDATE_BY_FILTER_MUTATION, {
      filter: { availableAmount: { lt: 100 } },
      data: { availableAmount: { add: 10 } }
    })
  } catch (error) {
    console.error('Failed to fill low amount products')
  }
};
