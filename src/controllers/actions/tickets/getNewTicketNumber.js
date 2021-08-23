export const getNewTicketNumber = function () {
  window[Symbol.for('vue.instance')].$root.$emit('progress-event', true)
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'tickets',
    action: 'number'
  })
}
