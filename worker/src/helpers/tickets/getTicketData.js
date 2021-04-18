import { getRecordByKey } from '../db'
import { getTicketDataError } from '../error-handlers'

export const getTicketData = async function (key) {
  const [route, action] = ['tickets', 'get']

  const { status, result } = await getRecordByKey(route, key)

  if (status !== 200) return getTicketDataError(status)
  return { status, route, action, result }
}
