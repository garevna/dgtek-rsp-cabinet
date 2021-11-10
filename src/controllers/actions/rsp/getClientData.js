import { eventsTable } from '@/controllers/events-table'
import { rsp } from '@/controllers/events'

export const getClientData = function (callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'rsp',
    action: 'get'
  })

  eventsTable[rsp.get] = callback
}
