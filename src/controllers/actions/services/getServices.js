import { eventsTable } from '@/controllers/events-table'
import { services } from '@/controllers/events'

export const getServices = function (callback) {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'services',
    action: 'list'
  })

  eventsTable[services.list] = callback
}
