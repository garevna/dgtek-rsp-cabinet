import { globalCallback } from './'

export function createRspWorker () {
  const path = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PUBLIC_PATH_PRODUCTION : ''

  window[Symbol.for('rsp.worker')] = Object.assign(new Worker(`${path}rsp.worker.js`), {
    onerror: (error) => console.error('Client worker Error\n', error),
    onmessage: globalCallback
  })

  window[Symbol.for('vue.prototype')].__worker = window[Symbol.for('rsp.worker')]
}
