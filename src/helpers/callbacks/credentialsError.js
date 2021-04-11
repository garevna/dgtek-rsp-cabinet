export function credentialsError () {
  window[Symbol.for('vue.prototype')].__commit('ERROR', {
    error: true,
    errorType: 'Credentials',
    errorMessage: 'Worker is not able to receive the data'
  })
}
