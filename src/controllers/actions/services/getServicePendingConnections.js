export const getServicePendingConnections = function (id) {
  window[Symbol.for('vue.instance')].$root.$emit('progress-event', true)
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'services',
    action: 'pending',
    key: id
  })
}
