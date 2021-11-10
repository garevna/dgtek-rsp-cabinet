import { eventsTable } from '@/controllers/events-table'
import { services } from '@/controllers/events'

export const getServiceActiveConnections = function (serviceId, callback) {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'services',
    action: 'active',
    key: serviceId
  })

  eventsTable[services.active] = callback
}
