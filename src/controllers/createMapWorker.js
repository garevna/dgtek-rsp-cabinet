import { mapWorkerEvents } from './events'
import { mapWorkerErrors } from './errors'

export function createMapWorker () {
  const path = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PUBLIC_PATH_PRODUCTION : ''

  window[Symbol.for('map.worker')] = new Worker(`${path}map.worker.js`)

  window[Symbol.for('map.worker')].onerror = function (error) {
    console.warn('Map worker Error\n', error)
  }

  window[Symbol.for('map.worker')].postMessage({ action: 'host', data: window[Symbol.for('vue.prototype')].$buildingsHost() })

  window[Symbol.for('map.worker')].onmessage = function (event) {
    if (!event.data) return
    if (event.data.status === 300) return console.log('MAP WORKER DEBUGGING MESSAGE:\n', event.data)

    const { action, status } = event.data
    if (action === 'store') return

    if (status === 200) {
      if (!mapWorkerEvents[action]) return
      const eventName = mapWorkerEvents[action]
      window[Symbol.for('vue.instance')].$root.$emit('progress-event', false)
      window[Symbol.for('vue.instance')].$root.$emit(eventName, event.data)
    } else {
      console.warn(event.data)
      if (!mapWorkerErrors[action]) return
      const { type: errorType, message: errorMessage } = mapWorkerErrors[action]()
      window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
        errorType,
        errorMessage
      })
    }
  }
}
