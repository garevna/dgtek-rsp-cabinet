import { getAllRecords } from '../db'
import { getTicketsListError } from '../error-handlers'
import { getDateString } from './'

export const getFromLocalDb = async function () {
  const [route, action] = ['tickets', 'list']

  let { status, result } = await getAllRecords('tickets')

  self.postMessage({ status: 300, route, action: 'test-data', result })

  result = result
    .map(ticket => Object.assign(ticket, { created: getDateString(ticket.created), modified: getDateString(ticket.modified) }))

  self.postMessage({ status: 300, route, action: 'test-data', result })

  if (status !== 200) return getTicketsListError(status)
  return { status, route, action, result }
}
