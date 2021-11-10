import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

export const updateCustomerServices = function (customerId, services, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'services',
    customerId,
    services
  })

  eventsTable[customers.services] = callback
}
