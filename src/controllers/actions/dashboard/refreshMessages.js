import { eventsTable } from '@/controllers/events-table'
import { dashboard } from '@/controllers/events'

import { messagesHandler } from '@/helpers'

const defaultCallback = function (messages) {
  messagesHandler(messages)
}

const [route, action] = ['dashboard', 'refresh-messages']

export const refreshMessages = function (callback) {
  window[Symbol.for('vue.instance')].__worker.postMessage({ route, action })
  // window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action })

  eventsTable[dashboard[action]] = callback || defaultCallback
}
