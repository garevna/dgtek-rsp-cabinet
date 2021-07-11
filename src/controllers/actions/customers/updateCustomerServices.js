export const updateCustomerServices = function (customerId, services) {
  window[Symbol.for('vue.instance')].$root.$emit('progress-event', true)
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'customers',
    action: 'services',
    customerId,
    services
  })
}
