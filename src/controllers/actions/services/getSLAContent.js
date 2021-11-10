import { eventsTable } from '@/controllers/events-table'
import { services } from '@/controllers/events'

export const getSLAContent = function (id, callback) {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'services',
    action: 'sla',
    key: id
  })

  eventsTable[services.sla] = callback
}
