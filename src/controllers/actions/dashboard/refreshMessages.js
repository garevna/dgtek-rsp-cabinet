import { eventsTable } from '@/controllers/events-table'
import { dashboard } from '@/controllers/events'

import { messagesHandler } from '@/helpers'

const callback = function (messages) {
  messagesHandler(messages)
}

export const refreshMessages = function () {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'dashboard',
    action: 'refresh-messages'
  })

  eventsTable[dashboard['refresh-messages']] = callback
}
