export function initError () {
  window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
    errorType: 'Init',
    errorMessage: 'Worker initialization failed'
  })
}
