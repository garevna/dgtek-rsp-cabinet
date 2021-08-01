// import { credentialCallback, initCallback } from '@/controllers/callbacks'
import {
  credentialCallback,
  refreshCallback,
  debuggerCallback,
  successCallback,
  errorCallback
} from '@/controllers/callbacks'

export function createRspWorker () {
  const path = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PUBLIC_PATH_PRODUCTION : ''

  window[Symbol.for('rsp.worker')] = new Worker(`${path}rsp.worker.js`)
  window[Symbol.for('rsp.worker')].onerror = (error) => console.error('Client worker Error\n', error)

  window[Symbol.for('vue.prototype')].__worker = window[Symbol.for('rsp.worker')]

  window[Symbol.for('rsp.worker')].onmessage = function (event) {
    if (!event.data || event.data.status === 300) return debuggerCallback(event.data)

    if (event.data.action === 'credentials') return credentialCallback(event)

    if (event.data.action.indexOf('refresh') !== -1) {
      refreshCallback(event)
      return event.data.status === 200 ? successCallback(event.data) : errorCallback(event.data)
    }

    const { status } = event.data

    status === 200 ? successCallback(event.data) : errorCallback(event.data)
  }
}
