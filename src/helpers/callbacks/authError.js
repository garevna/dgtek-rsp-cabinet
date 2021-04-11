export function authError () {
  window[Symbol.for('vue.prototype')].__commit('ERROR', {
    error: true,
    errorType: 'Authentification error',
    errorMessage: 'Invalid credentials'
  })
}
