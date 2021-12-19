import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

const [route, action] = ['customers', 'status']

export const updateServiceStatus = function (customerId, serviceId, newStatus, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, customerId, serviceId, newStatus })

  eventsTable[customers[action]] = callback
}
