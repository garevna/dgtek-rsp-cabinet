import { routes } from './configs'

import { controller } from './helpers'

self.initialized = false

self.controller = controller

self.onmessage = (event) => {
  const { route, action, ...data } = event.data
  self.postDebugMessage({ route, action })
  if (!routes[route][action] || typeof routes[route][action] !== 'function') {
    return self.postMessage({ status: 422, route, action, result: `${route}/${action} Invalid request for ${route}` })
  }
  routes[route][action](data)
}
