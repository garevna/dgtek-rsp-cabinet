import { getAllRecords } from '../db'

const { getServicesListError } = require('../error-handlers').default

export const getListOfServices = async function () {
  const { status, result } = await getAllRecords('services')
  if (status !== 200) return getServicesListError(status)
  return { status, route: 'services', action: 'list', result }
}
