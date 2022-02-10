import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

const [route, action] = ['customers', 'finish-cancel']

export const finishCancelation = function (customerId, serviceId, date, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action, customerId, serviceId, date })

  eventsTable[customers[action]] = callback
}
