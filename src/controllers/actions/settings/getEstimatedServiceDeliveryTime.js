import { eventsTable } from '@/controllers/events-table'
import { settings } from '@/controllers/events'

export const getEstimatedServiceDeliveryTime = function (key, callback) {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'settings',
    action: 'get',
    section: 'estimatedServiceDeliveryTime',
    key
  })

  eventsTable[settings.get] = callback
}
