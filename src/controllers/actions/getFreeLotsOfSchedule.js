export const getFreeLotsOfSchedule = function () {
  window[Symbol.for('vue.prototype')].sendMessageToWorker({
    route: 'schedule',
    action: 'get'
  })
}
