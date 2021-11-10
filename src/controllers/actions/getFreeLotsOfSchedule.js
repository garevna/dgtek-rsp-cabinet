import { eventsTable } from '@/controllers/events-table'
import { lots } from '@/controllers/events'

export const getFreeLotsOfSchedule = function (callback) {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'schedule',
    action: 'get'
  })

  eventsTable[lots.get] = callback
}
