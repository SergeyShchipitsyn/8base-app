type TriggerResult = {
  data: {
    result: string
  }
  errors: Array<object>
};

const illegalProducts = ['drugs', 'avocado', 'whale\'s milk']

function callThePolice() {
  console.log('Uuui! I-i-i-iuuu... Police is coming to you!')
}

export default async (event: any, ctx: any): Promise<TriggerResult> => {
  const { name } = event.data
  const isIllegalProduct = illegalProducts.some(
    illegalProduct => String(name).toLowerCase() === illegalProduct.toLowerCase()
  )

  if (isIllegalProduct) {
    callThePolice()
  }

  return {
    data: {
      ...event.data
    },
    errors: []
  };
};