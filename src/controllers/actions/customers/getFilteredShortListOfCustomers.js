import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

export const getFilteredShortListOfCustomers = function (filter, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'filtered-short-list',
    filter
  })

  eventsTable[customers['filtered-short-list']] = callback
}
