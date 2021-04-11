import { init } from '@/controllers/actions'
import { initCallback, initError } from './callbacks'

export function createRspWorker () {
  const path = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PUBLIC_PATH_PRODUCTION : ''
  console.log('PATH: ', path)

  window[Symbol.for('rsp.worker')] = new Worker(`/${path}rsp.worker.js`)
  window[Symbol.for('rsp.worker')].onerror = function (error) {
    initError()
    console.log('RSP worker Error\n', error)
  }

  window[Symbol.for('rsp.worker')].addEventListener('message', initCallback)

  init()

  window[Symbol.for('vue.prototype')].__worker = window[Symbol.for('rsp.worker')]
}
