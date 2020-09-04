/* eslint @typescript-eslint/no-explicit-any:0 */

export default async function someAction(
  params: any,
  context: any,
  config?: object
) {
  console.log('Event:', JSON.stringify(params, null, 2))
  console.log('Context:', JSON.stringify(context, null, 2))
  console.log('Config:', JSON.stringify(config, null, 2))

  if (params?.['@echo/throw']) {
    throw new Error(params['@echo/throw'])
  }

  if (params?.['@echo/http']) {
    return {
      statusCode: params['@echo/http']?.statusCode ?? '200',
      headers: {
        ...(params['@echo/http']?.headers ?? {})
      },
      body: JSON.stringify(params, null, 2)
    }
  } else {
    return params
  }
}
