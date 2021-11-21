import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

export const getCustomersListForTicket = function (partOfAddress, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'short',
    partOfAddress
  })

  eventsTable[customers.short] = callback
}
