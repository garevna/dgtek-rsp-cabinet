import { eventsTable } from '@/controllers/events-table'
import { settings } from '@/controllers/events'

export const getTicketCategories = function (callback) {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'settings',
    action: 'get',
    section: 'ticketCategories'
  })

  eventsTable[settings.get] = callback
}
