import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

const [route, action] = ['customers', 'services']

export const updateCustomerServices = function (customerId, services, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, customerId, services })

  eventsTable[customers[action]] = callback
}
