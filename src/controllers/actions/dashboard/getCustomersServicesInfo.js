import { eventsTable } from '@/controllers/events-table'
import { dashboard } from '@/controllers/events'

export const getCustomersServicesInfo = function (callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'dashboard',
    action: 'info'
  })

  eventsTable[dashboard.info] = callback
}
