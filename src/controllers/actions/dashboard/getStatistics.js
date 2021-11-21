import { eventsTable } from '@/controllers/events-table'
import { statistics } from '@/controllers/events'

export const getStatistics = function (callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'statistics',
    action: 'get'
  })

  eventsTable[statistics.get] = callback
}
