export const putCustomer = function (id, data) {
  window[Symbol.for('vue.instance')].$root.$emit('progress-event', true)
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'customers',
    action: 'put',
    key: id,
    data
  })
}
