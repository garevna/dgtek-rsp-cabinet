export function createRspWorker () {
  const path = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PUBLIC_PATH_PRODUCTION : ''

  window[Symbol.for('rsp.worker')] = new Worker(`${path}rsp.worker.js`)
  window[Symbol.for('rsp.worker')].onerror = function (error) {
    console.log('RSP worker Error\n', error)
  }

  window[Symbol.for('vue.prototype')].__worker = window[Symbol.for('rsp.worker')]

  window[Symbol.for('rsp.worker')].addEventListener('message', function (event) {
    if (event.data.status !== 300) return
    const { route, action, result } = event.data
    event.stopImmediatePropagation()
    console.log('WORKER DEBUGGING MESSAGE:\n', { route, action, result })
  })
}
