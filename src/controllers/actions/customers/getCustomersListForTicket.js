export const getCustomersListForTicket = function (partOfAddress) {
  window[Symbol.for('vue.instance')].$root.$emit('progress-event', true)
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'customers',
    action: 'short',
    partOfAddress
  })
}
