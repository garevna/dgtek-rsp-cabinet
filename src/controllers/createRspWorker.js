import { rspWorkerEvents } from './events'
import { rspWorkerErrors } from './errors'

export function createRspWorker () {
  const path = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PUBLIC_PATH_PRODUCTION : ''

  window[Symbol.for('rsp.worker')] = new Worker(`${path}rsp.worker.js`)
  window[Symbol.for('rsp.worker')].onerror = function (error) {
    console.warn('Client worker Error\n', error)
  }

  window[Symbol.for('vue.prototype')].__worker = window[Symbol.for('rsp.worker')]

  window[Symbol.for('rsp.worker')].onmessage = function (event) {
    if (event.data.status === 300) {
      event.stopImmediatePropagation()
      return console.log('RSP WORKER DEBUGGING MESSAGE:\n', event.data)
    }

    if (event.data.action === 'init' || event.data.action === 'credentials') return

    const { route, action, status, result } = event.data
    window[Symbol.for('vue.instance')].$root.$emit('progress-event', false)

    if (status === 200) {
      const eventName = rspWorkerEvents[route][action]

      console.log(route, action, eventName)

      window[Symbol.for('vue.instance')].$root.$emit(eventName, result)

      if (event.data.message) {
        window[Symbol.for('vue.instance')].$root.$emit('open-message-popup', {
          messageType: event.data.messageType || event.data.route,
          messageText: event.data.messageText || 'Success'
        })
      }
    } else {
      const { errorType, errorMessage } = event.data.error ? event.data : rspWorkerErrors[route][action]
      window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
        errorType,
        errorMessage
      })
    }
  }
}
