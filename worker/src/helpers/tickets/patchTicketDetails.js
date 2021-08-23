import { patch } from '../AJAX'

const {
  patchTicketDataError,
  getTicketsListError
} = require('../error-handlers').default

const route = 'tickets'

export const patchTicketDetails = async function (key, data) {
  const { _id } = data

  const { status } = await patch(`ticket/${_id}`, data)

  if (status !== 200) return patchTicketDataError(status)

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
