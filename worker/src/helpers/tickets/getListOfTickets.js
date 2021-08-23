import { getAllRecords } from '../db'

const { getTicketsListError } = require('../error-handlers').default

export const getListOfTickets = async function () {
  const [route, action] = ['tickets', 'list']

  let { status, result } = await getAllRecords('tickets')

  if (status !== 200) return getTicketsListError(status)

  result = result.sort((a, b) => a.created - b.created)
    .map((ticket, index) => Object.assign(ticket, {
      created: new Date(ticket.created - 0).toISOString().slice(0, 10),
      modified: new Date(ticket.modified - 0).toISOString().slice(0, 10)
    }))

  return { status, route, action, result }
}
