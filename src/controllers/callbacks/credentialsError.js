export function credentialsError (event) {
  window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
    errorType: 'Credentials',
    errorMessage: 'Worker is not able to receive the data'
  })
}
