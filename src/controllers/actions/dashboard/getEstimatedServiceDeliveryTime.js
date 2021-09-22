export const getEstimatedServiceDeliveryTime = function (key) {
  window[Symbol.for('vue.instance')].$root.$emit('progress-event', true)
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'settings',
    action: 'get',
    section: 'estimatedServiceDeliveryTime',
    key
  })
}
