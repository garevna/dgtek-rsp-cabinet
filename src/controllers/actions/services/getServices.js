export const getServices = function () {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'services',
    action: 'get'
  })
}
