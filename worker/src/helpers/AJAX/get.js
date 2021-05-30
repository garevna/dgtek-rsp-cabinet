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

  const res = await response.json()

  // self.postMessage({ status: 300, action: 'GET', res })

  if (response.status !== 200) return getCustomerDataError(response.status)

  // return { status: 200, result: (await (response.json())).data }
  return { status: 200, result: res.data }
}
