export const getServiceById = function (id) {
  window[Symbol.for('vue.instance')].$root.$emit('progress-event', true)
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'services',
    action: 'get',
    key: id
  })
}
