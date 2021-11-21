import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

export const updateServiceStatus = function (customerId, serviceId, newStatus, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'status',
    customerId,
    serviceId,
    newStatus
  })

  eventsTable[customers.status] = callback
}
