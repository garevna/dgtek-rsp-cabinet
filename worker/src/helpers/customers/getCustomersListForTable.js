import { getCustomersTableData } from '../db'

const { getCustomersListError } = require('../error-handlers').default

const [route, action] = ['customers', 'table']

export const getCustomersListForTable = async function () {
  const { status, result } = await getCustomersTableData()

  if (status !== 200) return getCustomersListError(status)

  return { status, route, action, result }
}
