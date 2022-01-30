import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

const [route, action] = ['customers', 'patch']

export const patchCustomer = function (customerId, customerDetails, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route,
    action,
    key: customerId,
    data: customerDetails
  })

  eventsTable[customers[action]] = callback
}
