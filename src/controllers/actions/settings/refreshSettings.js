import { eventsTable } from '@/controllers/events-table'
import { settings } from '@/controllers/events'

const [route, action] = ['settings', 'refresh']

export function refreshSettings (callback) {
  // window[Symbol.for('vue.prototype')].$sendMessageToWorker({ route, action })
  window[Symbol.for('vue.instance')].__worker.postMessage({ route, action })

  eventsTable[settings[action]] = callback
}
