import { rspWorkerErrors } from '../errors'

export function errorCallback (data) {
  window[Symbol.for('vue.instance')].$root.$emit('progress-event', false)
  const { route, action } = data
  const { errorType, errorMessage } = event.data.error ? event.data : rspWorkerErrors[route][action]

  window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
    errorType,
    errorMessage
  })
}
