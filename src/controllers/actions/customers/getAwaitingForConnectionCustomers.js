import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

export const getAwaitingForConnectionCustomers = function (callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'awaiting-for-connection'
  })

  eventsTable[customers['awaiting-for-connection']] = callback
}
