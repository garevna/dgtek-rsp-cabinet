import { routes } from './configs'

import { controller } from './helpers'

import { updatesController } from './controllers'

import { credentialsHandler } from './helpers/env'

self.initialized = false

self.controller = controller

self.updatesFrequency = 30000

const refreshMessages = () => {
  if (!credentialsHandler()) return setTimeout(getUpdatesFromRemote, self.frequency)
  updatesController.getMessageUpdates()

  setTimeout(refreshMessages, self.messageUpdatesFrequency)
}

refreshMessages()

const getUpdatesFromRemote = async () => {
  if (credentialsHandler()) {
    const { result: fullListOfNotifications } = await self.controller.getNotificationsAll()
    const response = await Promise.all([
      self.controller.getCustomerUpdates(fullListOfNotifications),
      self.controller.getTicketUpdates(fullListOfNotifications),
      self.controller.getMessageUpdates(fullListOfNotifications),
      self.controller.getServiceUpdates(fullListOfNotifications),
      self.controller.getSettingsUpdates(fullListOfNotifications)
    ])

    // self.postDebugMessage({ updates: Object.assign({}, ...response.map(record => ({ [record.action]: record.result }))) })

    self.postMessage({
      status: 200,
      route: 'updates',
      action: 'get',
      result: Object.assign({}, ...response.map(record => ({ [record.action]: record.result })))
    })
  }

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
