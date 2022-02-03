import { messagesHandler } from '../../data-handlers'

const [route, action] = ['updates', 'messages']

export const getMessageUpdates = async (notifications) => {
  if (!notifications || !Array.isArray(notifications)) return { status: 204, route, action, result: [] }

  const updates = notifications.filter(item => item.target === 'message')

  if (Array.isArray(updates) && updates.length) await self.controller.refreshMessages()

  return {
    status: 200,
    route,
    action,
    result: messagesHandler()
  }
}
