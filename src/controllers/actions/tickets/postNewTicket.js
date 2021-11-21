import { eventsTable } from '@/controllers/events-table'
import { tickets } from '@/controllers/events'

export const postNewTicket = function (data, callback) {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'tickets',
    action: 'post',
    data
  })

  eventsTable[tickets.post] = callback
}
