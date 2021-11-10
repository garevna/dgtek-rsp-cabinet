import { eventsTable } from '@/controllers/events-table'
import { tickets } from '@/controllers/events'

export const refreshTickets = function (callback) {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'tickets',
    action: 'refresh'
  })

  eventsTable[tickets.refresh] = callback
}
