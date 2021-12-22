import { eventsTable } from '@/controllers/events-table'
import { tickets } from '@/controllers/events'

const [route, action] = ['tickets', 'put']

export const saveTicketData = function (id, data, callback) {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({ route, action, key: id, data })

  eventsTable[tickets[action]] = callback
}
