import { getRecordByKey } from '../db'

import { idHandler } from '../env'

const { serviceUnavailable, getServiceDetailsError } = require('../error-handlers').default

export const getServiceById = async function (id) {
  const { status, result: service } = await getRecordByKey('services', id)

  if (status !== 200) return getServiceDetailsError(status)

  if (!service.partners.includes(idHandler())) return serviceUnavailable(service.name)

  return { status, route: 'services', action: 'get', result: service }
}
