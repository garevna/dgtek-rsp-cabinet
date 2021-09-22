import { refreshError } from './'
import { messagesHandler } from '../../helpers/data-handlers'

export function refreshCallback (event) {
  const { status, route, action } = event.data

  event.stopImmediatePropagation()

  if (status !== 200) return refreshError(route)

  const [proto, instance] = [window[Symbol.for('vue.prototype')], window[Symbol.for('vue.instance')]]

  const key = route === 'dashboard' && action === 'refresh-messages' ? 'messages' : route

  proto.$refreshed[key] = true

  instance.$root.$emit('data-refreshed', { route: key })

  if (key === 'messages') messagesHandler(event.data.result)

  if (Object.keys(proto.$refreshed).filter(key => !proto.$refreshed[key]).length) {
    instance.dispatchProgressEvent(false)
  }
}
