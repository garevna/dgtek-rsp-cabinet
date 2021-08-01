export const getSLAContent = function (id) {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'services',
    action: 'sla',
    key: id
  })
}
