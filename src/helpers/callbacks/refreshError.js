export function refreshError (route) {
  window[Symbol.for('vue.prototype')].__commit('ERROR', {
    error: true,
    errorType: 'Refresh DB error',
    errorMessage: `Request for ${route} to remote server failed`
  })
}
