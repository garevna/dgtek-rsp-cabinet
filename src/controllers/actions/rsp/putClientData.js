export const putClientData = function (data) {
  // window[Symbol.for('vue.prototype')].__commit('SET_REQUEST_FLAG', { route: 'rsp', status: true })
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'rsp',
    action: 'put',
    data
  })
}
