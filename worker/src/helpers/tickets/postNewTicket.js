import { post } from '../AJAX'
import { postNewTicketError } from '../error-handlers'
import { getFromRemoteServer, getFromLocalDb } from './'

export const postNewTicket = async function (data) {
  // const [route, action] = ['tickets', 'post']
  const route = 'tickets'
  const { data: ticket } = data

  Object.assign(ticket, {
    created: Date.now().toString(),
    modified: Date.now().toString()
  })

  // self.postMessage({ status: 300, route, action, result: ticket })

  // const { status, result } = await post('ticket', ticket)
  await post('ticket', ticket)

  // self.postMessage({ status: 300, route, action, result: { status, ...result } })

  if (status !== 200) return postNewTicketError(status)

  // const { data: newTicket } = result

  // self.postMessage({ status: 300, route: 'tickets', action: 'new ticket', result: newTicket })

  // self.postMessage({ status: 300, route, action, result })

  // const { status: refreshStatus, result: refreshResult } = await getFromRemoteServer()
  await getFromRemoteServer()

  // self.postMessage({ status: 300, route, action: 'refresh', result: { status: refreshStatus, result: refreshResult } })

  const { status: getStatus, result: getResult } = await getFromLocalDb()

  // self.postMessage({ status: 300, route, action: 'list', result: getResult })

  return getStatus !== 200 ? postNewTicketError(getStatus)
    : ({
      status: 200,
      route,
      action: 'list',
      result: getResult,
      message: true,
      messageType: 'Tickets',
      messageText: 'New ticket has been created'
    })
}
