import { eventsTable } from '@/controllers/events-table'
import { services } from '@/controllers/events'

export const refreshServices = function (callback) {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'services',
    action: 'refresh'
  })

  eventsTable[services.refresh] = callback
}
