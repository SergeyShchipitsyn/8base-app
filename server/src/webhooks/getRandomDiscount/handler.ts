import fetch from "node-fetch";

const RANDOM_NUMBER_URL = "https://www.random.org/integers/"

type WebhookResult = {
  statusCode: number
  body: string
};

export default async (event: any, ctx: any) : Promise<WebhookResult> => {
  const { shopId } = event.pathParameters;
  const { minPercent, maxPercent } = JSON.parse(event.body);

  try {
    const randomNumber = await fetch(
      `${RANDOM_NUMBER_URL}?num=1&min=${minPercent}&max=${maxPercent}&col=1&base=10&format=plain&rnd=new`
    )
    const randomDiscount = await randomNumber.json()

    return {
      statusCode: 200,
      body: JSON.stringify({
        result: `Today discount for shop "id: ${shopId}" is ${randomDiscount}%`,
      })
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        result: `Couldn't get random discount for shop "id: ${shopId}"`,
      })
    };
  }
};