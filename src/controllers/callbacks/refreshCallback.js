import { refreshError } from './'

window[Symbol.for('vue.prototype')].$refreshed = {
  rsp: false,
  customers: false,
  categories: false,
  tickets: false,
  services: false
}

export function refreshCallback (event) {
  const { status, route, action } = event.data

  if (action !== 'refresh') return

  event.stopImmediatePropagation()
  if (status !== 200) return refreshError(route)

  window[Symbol.for('vue.prototype')].$refreshed[route] = true

  window[Symbol.for('vue.instance')].$root.$emit('data-refreshed', { route })
}
