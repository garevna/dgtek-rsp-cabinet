import { errors } from '../errors.config'

const [rsp, customers, tickets, services] = Object.keys(errors).map(prop => errors[prop].refresh)

const refreshErrors = { rsp, customers, tickets, services }

export function refreshError (route) {
  window[Symbol.for('vue.instance')].$root.emit('open-error-popup', {
    errorType: refreshErrors[route].errorType,
    errorMessage: refreshErrors[route].errorMessage
  })
}
