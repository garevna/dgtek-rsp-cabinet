import { refreshError } from './'

export function refreshCallback (event) {
  const { status, route } = event.data

  event.stopImmediatePropagation()

  if (status !== 200) return refreshError(route)

  const [proto, instance] = [window[Symbol.for('vue.prototype')], window[Symbol.for('vue.instance')]]

  proto.$refreshed[route] = true

  instance.$root.$emit('data-refreshed', { route })

  if (Object.keys(proto.$refreshed).filter(key => !proto.$refreshed[key]).length) {
    instance.dispatchProgressEvent(false)
  }
}
