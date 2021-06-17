import {
  hostHandler,
  apiKeyHandler,
  credentialsHandler
} from '../env'

const { getCustomerDataError } = require('../error-handlers').default

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

  if (response.status !== 200) return getCustomerDataError(response.status)

  return Object.assign({ status: 200, result: res.data }, res.page ? { page: res.page, pages: res.pages } : {})
}
