import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

export const getCustomersListForTable = function (callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'table'
  })

  eventsTable[customers.table] = callback
}
