import { eventsTable } from '@/controllers/events-table'
import { rsp } from '@/controllers/events'

export const putClientData = function (data, callback) {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'rsp',
    action: 'put',
    data
  })

  eventsTable[rsp.put] = callback
}
