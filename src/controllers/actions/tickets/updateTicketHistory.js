import { eventsTable } from '@/controllers/events-table'
import { tickets } from '@/controllers/events'

const [route, action] = ['tickets', 'history']

export const updateTicketHistory = function (id, history, callback) {
  // window[Symbol.for('vue.prototype')].sendMessageToWorker({ route, action, key: id, history })
  window[Symbol.for('vue.instance')].__worker.postMessage({ route, action, key: id, history })

  eventsTable[tickets[action]] = callback
}
