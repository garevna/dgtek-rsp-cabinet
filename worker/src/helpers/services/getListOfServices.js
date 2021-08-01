import { getAllRecords } from '../db'

import { idHandler } from '../env'

const { getServicesListError } = require('../error-handlers').default

export const getListOfServices = async function () {
  const { status, result } = await getAllRecords('services')

  if (status !== 200) return getServicesListError(status)

  return {
    status,
    route: 'services',
    action: 'list',
    result: result.filter(service => service.partners ? service.partners.includes(idHandler()) : false)
  }
}
