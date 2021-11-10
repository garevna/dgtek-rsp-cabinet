import { eventsTable } from '@/controllers/events-table'
import { settings } from '@/controllers/events'

export const refreshSettings = function (callback) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'settings',
    action: 'refresh'
  })

  eventsTable[settings.refresh] = callback
}
