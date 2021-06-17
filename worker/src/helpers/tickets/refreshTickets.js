import { get } from '../AJAX'
import { clearStore, putRecordByKey } from '../db'
// import { getDateNumber } from './'

const { refreshTicketsListError, getTicketDataError } = require('../error-handlers').default

export const refreshTickets = async function () {
  const [route, action] = ['tickets', 'refresh']

  const { status, result } = await get('ticket')

  if (status !== 200) return refreshTicketsListError(status)

  const { ticketCategories, tickets } = result

  await clearStore('tickets')

  const { status: categoryStatus } = await putRecordByKey('categories', 'ticketsCategories', ticketCategories)

  if (categoryStatus !== 200) return refreshTicketsListError(categoryStatus)

  const promises = tickets.map(record => putRecordByKey('tickets', record._id, record).catch(() => self.postMessage(getTicketDataError(500))))

  const response = (await Promise.all(promises)).map(item => item.result)

  return { status, route, action, result: response }
}
