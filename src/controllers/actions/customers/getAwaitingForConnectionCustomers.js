export const getAwaitingForConnectionCustomers = function () {
  window[Symbol.for('vue.prototype')].$sendMessageToWorker({
    route: 'customers',
    action: 'awaiting-for-connection'
  })
}
