import { getAllRecords } from '../db'
import { getTicketsListError } from '../error-handlers'

export const getFromLocalDb = async function () {
  const [route, action] = ['tickets', 'list']

  const { status, result } = await getAllRecords('tickets')

  if (status !== 200) return getTicketsListError(status)
  return { status, route, action, result }
}
