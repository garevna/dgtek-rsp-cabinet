import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

export const sendSchedulingRequest = function (data, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'scheduling',
    data
  })

  eventsTable[customers.scheduling] = callback
}
