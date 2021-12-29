import { routes } from './configs'

import { controller } from './helpers'

import { updatesController } from './controllers'

import { credentialsHandler } from './helpers/env'

self.initialized = false

self.controller = controller

self.updatesFrequency = 10000
self.messageUpdatesFrequency = 60000

const refreshMessages = () => {
  if (!credentialsHandler()) return setTimeout(getUpdatesFromRemote, self.frequency)
  updatesController.getMessageUpdates()

  setTimeout(refreshMessages, self.messageUpdatesFrequency)
}

refreshMessages()

const getUpdatesFromRemote = () => {
  if (!credentialsHandler()) return setTimeout(getUpdatesFromRemote, self.frequency)

  updatesController.getLastUpdates()

  setTimeout(getUpdatesFromRemote, self.updatesFrequency)
}

getUpdatesFromRemote()

self.postDebugMessage = function (message) {
  self.postMessage(Object.assign(message, { status: 300 }))
}

self.onmessage = (event) => {
  const { route, action, ...data } = event.data

  if (!routes[route][action] || typeof routes[route][action] !== 'function') {
    return self.postMessage({ status: 422, route, action, result: `${route}/${action} Invalid request for ${route}` })
  }
  routes[route][action](data)
}
