import { mapWorkerEvents } from './events'
import { mapWorkerErrors } from './errors'

export function createMapWorker () {
  const path = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PUBLIC_PATH_PRODUCTION : ''

  window[Symbol.for('map.worker')] = new Worker(`${path}map.worker.js`)

  window[Symbol.for('map.worker')].onerror = function (error) {
    console.warn('Map worker Error\n', error)
  }

  console.log('HOST: ', window[Symbol.for('vue.prototype')].$buildingsHost())

  window[Symbol.for('map.worker')].postMessage({ action: 'host', host: window[Symbol.for('vue.prototype')].$buildingsHost() })

  window[Symbol.for('map.worker')].onmessage = function (event) {
    if (!event.data) return console.info('Map worker: empty response')
    if (event.data.status === 300) {
      const { status, ...data } = event.data
      return console.log('MAP WORKER DEBUGGING MESSAGE:\n', data)
    }

    const { action, status } = event.data
    if (['host', 'store', 'init'].includes(action)) return console.info('MAP WORKER CONFIGURED', action, status)

    if (status === 200) {
      if (!mapWorkerEvents[action]) return
      const eventName = mapWorkerEvents[action]
      window[Symbol.for('vue.instance')].$root.$emit('progress-event', false)
      window[Symbol.for('vue.instance')].$root.$emit(eventName, event.data)
    } else {
      if (!mapWorkerErrors[action]) return console.log(event.data)

      const { warning = false, type: errorType, message: errorMessage } = mapWorkerErrors[action](event.data)

      window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
        warning,
        errorType,
        errorMessage
      })
    }
  }
}
