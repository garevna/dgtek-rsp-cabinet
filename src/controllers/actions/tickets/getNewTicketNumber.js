import { eventsTable } from '@/controllers/events-table'
import { tickets } from '@/controllers/events'

export const getNewTicketNumber = function (callback) {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'tickets',
    action: 'number'
  })

  eventsTable[tickets.number] = callback
}
