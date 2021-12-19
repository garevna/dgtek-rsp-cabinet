import { eventsTable } from '@/controllers/events-table'
import { settings } from '@/controllers/events'

const section = 'pendingConnectionStatus'

export const getPendingConnectionStatus = function (callback) {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'settings',
    action: 'get',
    section
  })

  // eventsTable[`${section}-${settings.get}`] = callback
  eventsTable[settings.get[section]] = callback
}
