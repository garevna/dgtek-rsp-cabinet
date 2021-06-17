import { getRecordByKey } from '../db'

const { getTicketDataError } = require('../error-handlers').default

export const getTicketData = async function (key) {
  const [route, action] = ['tickets', 'get']

  const { status, result } = await getRecordByKey(route, key)

  if (status !== 200) return getTicketDataError(status)
  return { status, route, action, result }
}
