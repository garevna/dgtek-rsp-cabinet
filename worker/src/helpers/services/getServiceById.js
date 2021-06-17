import { getRecordByKey } from '../db'

const { getServiceDetailsError } = require('../error-handlers').default

export const getServiceById = async function (id) {
  const { status, result } = await getRecordByKey('services', id)
  if (status !== 200) return getServiceDetailsError(status)
  return { status, route: 'services', action: 'get', result }
}
