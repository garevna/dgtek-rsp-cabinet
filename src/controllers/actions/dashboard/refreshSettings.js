export const refreshSettings = function () {
  window[Symbol.for('vue.instance')].$root.$emit('progress-event', true)
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'settings',
    action: 'refresh'
  })
}
