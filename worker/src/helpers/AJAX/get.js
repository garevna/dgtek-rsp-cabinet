import {
  hostHandler,
  apiKeyHandler,
  credentialsHandler
} from '../env'

import { getCustomerDataError } from '../error-handlers'

export const get = async function (path) {
  if (!navigator.onLine) return { status: 0, result: 'Offline mode: operation is impossible' }

  const response = await fetch(`${hostHandler()}/${path}`, {
    method: 'GET',
    headers: {
      Authorization: apiKeyHandler(),
      Credentials: credentialsHandler()
    }
  })

  if (response.status !== 200) return getCustomerDataError(response.status)

  return { status: 200, result: (await (response.json())).data }
}
