import { eventsTable } from '@/controllers/events-table'
import { tickets } from '@/controllers/events'

const [route, action] = ['tickets', 'patch']

export const patchTicket = function (id, data, callback) {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({ route, action, key: id, data })

  eventsTable[tickets[action]] = callback
}
