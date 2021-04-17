export const getTicketById = function (id) {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'tickets',
    action: 'get',
    key: id
  })
}
