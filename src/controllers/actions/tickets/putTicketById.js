export const putTicketById = function (id, data) {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'tickets',
    action: 'put',
    key: id,
    data
  })
}
