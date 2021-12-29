import { eventsTable } from '@/controllers/events-table'
import { tickets } from '@/controllers/events'

export const getCategories = function (callback) {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'tickets',
    action: 'get'
  })

  eventsTable[tickets.get] = callback
}
