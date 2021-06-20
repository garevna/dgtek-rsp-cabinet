import { post } from '../AJAX'

const { postNewTicketError, refreshTicketsListError } = require('../error-handlers').default

export const postNewTicket = async function (data) {
  const { data: ticket } = data

  ticket.created = ticket.created.toString()
  ticket.modified = ticket.modified.toString()

  if ((await post('ticket', ticket)).status !== 200) return postNewTicketError(500)

  self.postMessage({
    status: 200,
    route: 'tickets',
    action: 'post',
    message: true,
    messageType: 'Tickets',
    messageText: 'New ticket has been created'
  })

  if ((await self.controller.getTicketsFromRemoteServer()).status !== 200) return refreshTicketsListError(500)

  const { status, result } = await self.controller.getFromLocalDb()

  return status !== 200 ? postNewTicketError(status) : ({ status: 200, route: 'tickets', action: 'list', result })
}
