import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

export const sendServiceActivationRequest = function (customerId, serviceId, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'activate',
    customerId,
    serviceId
  })

  eventsTable[customers.activate] = callback
}
