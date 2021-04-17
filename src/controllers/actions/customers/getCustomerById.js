export const getCustomerById = function (id) {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'customers',
    action: 'get',
    key: id
  })
}
