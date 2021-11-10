import { eventsTable } from '@/controllers/events-table'
import { tickets } from '@/controllers/events'

export const getTicketById = function (id, callback) {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'tickets',
    action: 'get',
    key: id
  })

  eventsTable[tickets.get] = callback
}
