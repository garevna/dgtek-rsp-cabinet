import { eventsTable } from '@/controllers/events-table'
import { tickets } from '@/controllers/events'

export const saveTicketData = function (id, data, callback) {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'tickets',
    action: 'put',
    key: id,
    data
  })

  eventsTable[tickets.put] = callback
}
