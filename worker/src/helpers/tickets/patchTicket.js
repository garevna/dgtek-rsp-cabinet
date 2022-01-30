import { patch } from '../AJAX'

const { patchTicketDataError } = require('../error-handlers').default

const [route, action] = ['tickets', 'patch']

export const patchTicket = async function (key, data) {
  const { status, result } = await patch(`ticket/${key}`, data)

  if (status !== 200) return patchTicketDataError(status)

  await self.controller.sendNotification('ticket', key)

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
