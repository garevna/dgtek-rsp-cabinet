import { get } from '../AJAX'
import { messagesHandler } from '../../data-handlers'

const { refreshMessagesError } = require('../error-handlers').default

const [route, action] = ['dashboard', 'refresh-messages']

export const refreshMessages = async function () {
  const { status, result } = await get('messages')

  if (status !== 200) return refreshMessagesError(status)

  messagesHandler(result.messages)

  return { status: 200, route, action, result: messagesHandler() }
}
