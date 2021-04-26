export const putClientData = function (data) {
  window[Symbol.for('vue.instance')].$root.$emit('progress-event', true)
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'rsp',
    action: 'put',
    data
  })
}
