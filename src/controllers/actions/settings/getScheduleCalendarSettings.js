import { eventsTable } from '@/controllers/events-table'
import { settings } from '@/controllers/events'

export const getScheduleCalendarSettings = function (callback) {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'settings',
    action: 'get',
    section: 'scheduleCalendarSettings'
  })

  eventsTable[settings.get] = callback
}
