import { get, patch } from '../AJAX'
import { clearStore, putRecordByKey } from '../db'

import { getTicketNumber } from './getTicketNumber'
import { getShortTicketInfo } from './getShortTicketInfo'

const { refreshTicketsListError, putTicketToLocalDBError } = require('../error-handlers').default

const [route, action] = ['tickets', 'refresh']

export const refreshTickets = async function () {
  let currentPage = 1
  const perPage = 100

  // let categories = false

  const shortList = []

  await clearStore('tickets')

  do {
    var { status, result } = await get(`ticket?page=${currentPage++}&per_page=${perPage}`)

    var { /* ticketCategories, */ tickets, page, pages } = result

    if (status !== 200) return refreshTicketsListError(status)

    // if (!categories) {
    //   const { status } = await putRecordByKey('categories', 'ticketsCategories', ticketCategories)
    //   if (status !== 200) self.postMessage(refreshTicketsListError(status))
    //   else categories = true
    // }

    shortList.concat(tickets.map(ticket => getShortTicketInfo(ticket)))

    for (const ticket of tickets) {
      const number = getTicketNumber(ticket)
      ticket.number !== number && await patch(`ticket/${ticket._id}`, { number })
      Object.assign(ticket, { number })
    }

    const promises = tickets.map(record => putRecordByKey('tickets', record._id, record))
    const response = await Promise.all(promises)
    if (response.filter(item => item.status !== 200).length) self.postMessage(putTicketToLocalDBError())
  } while (page < pages)

  shortList.sort((a, b) => a.created - b.created)

  return { status, route, action, result: shortList }
}
