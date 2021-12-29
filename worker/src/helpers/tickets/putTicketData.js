import { put } from '../AJAX'

const { putTicketDataError } = require('../error-handlers').default

const [route, action] = ['tickets', 'put']

export const putTicketData = async function (key, data) {
  self.postDebugMessage({ key, data })

  data.created = Date.parse(data.created).toString()
  data.modified = Date.now().toString()

  const { status, result } = await put(`ticket/${key}`, data)

  if (status !== 200) return putTicketDataError(status)

  // const { status: refreshStatus } = await self.controller.refreshTickets()
  // if (refreshStatus !== 200) return refreshTicketsListError(refreshStatus)
  // const { status: getStatus, result: getResult } = await self.controller.getListOfTickets()
  // if (getStatus !== 200) return getTicketsListError(getStatus)

  return {
    status,
    route,
    action,
    result,
    message: true,
    messageType: 'Ticket details',
    messageText: 'Ticket details updated'
  }
}
