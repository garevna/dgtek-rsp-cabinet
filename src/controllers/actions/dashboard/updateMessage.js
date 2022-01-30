import { eventsTable } from '@/controllers/events-table'
import { dashboard } from '@/controllers/events'

import { messagesHandler } from '@/helpers'

const defaultCallback = function (message) {
  const messages = messagesHandler()
  const index = messages.findIndex(item => item._id === message._id)
  if (index === -1) return
  Object.assign(messages[index], message)
  messagesHandler(messages)
}

const [route, action] = ['dashboard', 'patch-message']

export const updateMessage = function (messageId, fields, callback) {
  window[Symbol.for('vue.instance')].__worker.postMessage({
    route,
    action,
    messageId,
    fields
  })

  eventsTable[dashboard[action]] = callback || defaultCallback
}
