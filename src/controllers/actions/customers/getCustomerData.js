import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

export const getCustomerData = function (customerId, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'get',
    key: customerId
  })

  eventsTable[customers.get] = callback
}
