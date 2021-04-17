export const getCustomers = function () {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'customers',
    action: 'list'
  })
}
