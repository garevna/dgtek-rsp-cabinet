import { put } from '../AJAX'

const {
  putTicketDataError,
  refreshTicketsListError,
  getTicketsListError
} = require('../error-handlers').default

export const putTicketData = async function (key, data) {
  const route = 'tickets'
  const { _id } = data

  data.created = Date.parse(data.created).toString()
  data.modified = Date.now().toString()

  const { status } = await put(`ticket/${_id}`, data)

  if (status !== 200) return putTicketDataError(status)

  const { status: refreshStatus } = await self.controller.refreshTickets()

  if (refreshStatus !== 200) return refreshTicketsListError(refreshStatus)

  const { status: getStatus, result: getResult } = await self.controller.getListOfTickets()

  if (getStatus !== 200) return getTicketsListError(getStatus)

  return {
    status,
    route,
    action: 'list',
    result: getResult,
    message: true,
    messageType: 'Ticket details',
    messageText: 'Ticket details updated'
  }
}
