export const getCustomerData = function (id) {
  console.log(id)
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'customers',
    action: 'get',
    key: id
  })
}
