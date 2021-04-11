export function initError () {
  window[Symbol.for('vue.prototype')].__commit('ERROR', {
    error: true,
    errorType: 'Init',
    errorMessage: 'Worker initialization error'
  })
}
