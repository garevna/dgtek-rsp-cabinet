import { eventsTable } from '@/controllers/events-table'
import { statistics } from '@/controllers/events'

const [route, action] = ['statistics', 'get']

export const getStatistics = function (callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action })

  eventsTable[statistics[action]] = callback
}
