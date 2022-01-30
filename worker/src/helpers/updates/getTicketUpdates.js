import { get } from '../AJAX'
import { putRecordByKey } from '../db'

const [route, action] = ['updates', 'tickets']

export const getTicketUpdates = async (notifications) => {
  if (!notifications || !Array.isArray(notifications)) return { status: 204, route, action, result: [] }

  let promises = notifications
    .filter(item => item.target === 'ticket')
    .map(note => note.id)
    .map(id => get(`ticket/${id}`))

  const responses = await Promise.all(promises)

  const tickets = responses.map(response => response.result)

  promises = tickets.map(ticket => putRecordByKey('tickets', ticket._id, ticket))

  await Promise.all(promises)

  return { status: 200, route, action, result: tickets }
}
