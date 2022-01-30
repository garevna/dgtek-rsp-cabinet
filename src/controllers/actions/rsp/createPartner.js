import { eventsTable } from '@/controllers/events-table'
import { rsp } from '@/controllers/events'

const [route, action] = ['rsp', 'create']

export const createPartner = function (callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action })

  eventsTable[rsp[action]] = callback
}
