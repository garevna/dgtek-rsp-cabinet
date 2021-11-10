import { eventsTable } from '@/controllers/events-table'
import { tickets } from '@/controllers/events'

export const getTickets = function (callback) {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'tickets',
    action: 'list'
  })

  eventsTable[tickets.list] = callback
}
