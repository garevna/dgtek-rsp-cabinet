import { patch } from '../AJAX'
import { messagesHandler } from '../../data-handlers'

const { refreshMessagesError } = require('../error-handlers').default

const [route, action] = ['dashboard', 'patch-message']

const error = {
  route,
  action,
  error: true,
  errorType: 'Partner response for admin message'
}

const messageNotFound = Object.assign(error, {
  status: 404,
  errorMessage: 'Message not found'
})

export const patchMessage = async function (messageId, fields) {
  const messages = messagesHandler()

  if (!messages) return refreshMessagesError(400)

  const index = messages.findIndex(item => item._id === messageId)

  if (index === -1) return messageNotFound

  Object.assign(messages[index], { fields })

  messagesHandler(messages)

  const { status, result } = await patch(`messages/${messageId}`, { fields })

  await self.controller.sendNotification('message', messageId)

  if (status !== 200) return Object.assign(error, { status: 500, errorMessage: 'Operation failed: remote server error' })

  return { status: 200, route, action, result }
}
