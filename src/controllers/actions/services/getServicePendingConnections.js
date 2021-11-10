import { eventsTable } from '@/controllers/events-table'
import { services } from '@/controllers/events'

export const getServicePendingConnections = function (serviceId, callback) {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'services',
    action: 'pending',
    key: serviceId
  })

  eventsTable[services.pending] = callback
}
