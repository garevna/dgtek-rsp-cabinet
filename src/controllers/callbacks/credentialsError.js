export function credentialsError (event) {
  window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
    errorType: 'Authentification',
    errorMessage: 'Credentials have not been received'
  })
}
