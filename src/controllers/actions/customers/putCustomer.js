import { eventsTable } from '@/controllers/events-table'
import { customers } from '@/controllers/events'

export const putCustomer = function (customerId, customerDetails, callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'put',
    key: customerId,
    data: customerDetails
  })

  eventsTable[customers.put] = callback
}
