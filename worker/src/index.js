import { routes } from './configs'

self.initialized = false

self.onmessage = (event) => {
  const { route, action, ...data } = event.data
  if (!routes[route][action] || typeof routes[route][action] !== 'function') {
    return self.postMessage({ status: 422, route, action, result: `${route}/${action} Invalid request for ${route}` })
  }
  routes[route][action](data)
}
