import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

export const assignNewServiceToCustomer = function (customerId, serviceId, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'assign',
    customerId,
    serviceId
  })

  eventsTable[customers.assign] = callback
}
