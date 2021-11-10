import { getCustomersTableData } from '../db'

const { getCustomersListError } = require('../error-handlers').default

export const getCustomersListForTable = async function () {
  const [route, action] = ['customers', 'table']

  const { status, result } = await getCustomersTableData()

  if (status !== 200) return getCustomersListError(status)

  return { status, route, action, result }
}
