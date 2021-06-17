export function authError () {
  window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
    errorType: 'Authentification',
    errorMessage: 'Invalid credentials'
  })
}
