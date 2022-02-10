import { eventsTable } from '@/controllers/events-table'
import { buildings } from '@/controllers/events'

const defaultCallback = (data) => console.log('Notification sent:\n', data)

const [route, action, target] = ['buildings', 'notify', 'building']

export const sendNotification = function (buildingId, callback) {
  window[Symbol.for('vue.instance')].__worker.postMessage({ route, action, target, id: buildingId })

  eventsTable[buildings[action]] = callback || defaultCallback
}
