import { post } from '../AJAX'

import {
  postNewTicketError,
  refreshTicketsListError,
  getTicketsListError
} from '../error-handlers'

import { getFromRemoteServer, getFromLocalDb } from './'

export const postNewTicket = async function (data) {
  const route = 'tickets'
  const { data: ticket } = data

  Object.assign(ticket, {
    created: Date.now().toString(),
    modified: Date.now().toString()
  })

  const { status } = await post('ticket', ticket)

  if (status !== 200) return postNewTicketError(status)

  const { status: refreshStatus } = await getFromRemoteServer()

  if (refreshStatus !== 200) return refreshTicketsListError(refreshStatus)

  const { status: getStatus, result: getResult } = await getFromLocalDb()

  if (getStatus !== 200) return getTicketsListError(getStatus)

  return {
    status,
    route,
    action: 'list',
    result: getResult,
    message: true,
    messageType: 'Tickets',
    messageText: 'New ticket has been created'
  }
}
