import { searchRecords } from '../db'

const { getCustomersListError } = require('../error-handlers').default

export const getShortListOfCustomers = async function (data) {
  const [route, action] = ['customers', 'short']

  const { partOfAddress } = data

  const { status, result } = await searchRecords('customers', 'address', partOfAddress.toUpperCase())

  if (status !== 200) return getCustomersListError(status)

  return { status, route, action, result }
}
