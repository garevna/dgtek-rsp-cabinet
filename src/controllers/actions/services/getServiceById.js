import { eventsTable } from '@/controllers/events-table'
import { services } from '@/controllers/events'

export const getServiceById = function (serviceId, callback) {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'services',
    action: 'get',
    key: serviceId
  })

  eventsTable[`${serviceId}-${services.get}`] = callback
}
