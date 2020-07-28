const gql = require('graphql-tag');


type ResolverResult = {
  data: {
    result: string
  }
};

const PRODUCTS_LIST_QUERY = gql`
  query ProductsList($first: Int, $skip: Int) {
    productsList(first: $first, skip: $skip) {
      items {
        id
        name
        description
        price
        availableAmount
        bestBefore
      }
    }
  }
`;

export default async (event: any, ctx: any) : Promise<ResolverResult> => {
  const productsList = await ctx.api.gqlRequest(PRODUCTS_LIST_QUERY, {
    skip: 0,
    first: 1
  })

  const firstProduct = productsList && productsList.items && productsList.items[0]

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