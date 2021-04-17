import { getAllRecords } from '../db'
import { getCustomersListError } from '../error-handlers'

export const getAllCustomers = async function () {
  const { status, result } = await getAllRecords('customers')
  if (status !== 200) return getCustomersListError(status)
  return { status, route: 'customers', action: 'list', result }
}
