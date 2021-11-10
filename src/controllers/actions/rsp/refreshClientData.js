import { eventsTable } from '@/controllers/events-table'
import { rsp } from '@/controllers/events'

export const refreshClientData = function (callback) {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'rsp',
    action: 'refresh'
  })

  eventsTable[rsp.refresh] = callback
}
