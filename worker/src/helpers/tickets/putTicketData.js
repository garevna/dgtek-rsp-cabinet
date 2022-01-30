import { put } from '../AJAX'

const { putTicketDataError } = require('../error-handlers').default

const [route, action] = ['tickets', 'put']

export const putTicketData = async function (key, data) {
  data.created = Date.parse(data.created).toString()
  data.modified = Date.now().toString()

  const { status, result } = await put(`ticket/${key}`, data)

  if (status !== 200) return putTicketDataError(status)

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
