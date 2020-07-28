const gql = require('graphql-tag');


const PRODUCT_UPDATE_BY_FILTER_MUTATION = gql`
  mutation ProductUpdateByFilter($filter: ProductUpdateFilter, $data: ProductUpdateInput!) {
    productUpdateByFilter(filter: $filter, data: $data) {
      id
      name
      description
      price
      availableAmount
      bestBefore
    }
  }
`;

export default async (event: any, ctx: any): Promise<void> => {
  try {
    await ctx.api.gqlRequest(PRODUCT_UPDATE_BY_FILTER_MUTATION, {
      filter: { availableAmount: { lt: 100 } },
      data: { availableAmount: { add: 10 } }
    })
  } catch (error) {
    console.log('Failed to fill low amount products')
  }
};
