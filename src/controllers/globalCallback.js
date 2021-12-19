import { eventsTable, statisticsController } from '@/controllers'

import {
  credentialCallback,
  refreshCallback,
  debuggerCallback
} from '@/controllers/callbacks'

import * as globalEvents from '@/controllers/events'

export const globalCallback = function (event) {
  const { route, action, section, status, result, error, message } = event.data

  if (status === 300) return debuggerCallback(event)
  if (status === 100) return event.stopPropagation()

  if (action === 'credentials') return credentialCallback(event)

  if (error) {
    const { errorType, errorMessage } = event.data
    window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', { errorType, errorMessage })
  }

  if (message) {
    const { messageType, messageText } = event.data
    window[Symbol.for('vue.instance')].$root.$emit('open-message-popup', { messageType, messageText })
  }

  if (route === 'statistics') return statisticsController.catchUpdates(event.data)

  const eventName = route === 'settings' && action === 'get' ? globalEvents[route][action][section]
    : route === 'services' && action === 'get' ? `${result._id}-${globalEvents[route][action]}` : globalEvents[route][action]

  // console.log('EVENT NAME: ', eventName)

  if (event.data?.action.indexOf('refresh') !== -1) {
    if (!eventsTable[eventName]) refreshCallback(event)
    else if (typeof eventsTable[eventName] === 'function') eventsTable[eventName](result)
    delete eventsTable[eventName]
    return
  }

  window[Symbol.for('vue.instance')].$root.$emit('progress-event', false)

  if (!eventsTable[eventName]) {
    console.log('EVENTS TABLE:\n', eventsTable)
    // console.log('ROUTE AND ACTION:\n', route, action)
    // console.log('Not expected event', eventName)
    return console.warn('Not expected event', eventName, route, action, event.data)
  }
  if (typeof eventsTable[eventName] !== 'function') return console.warn('Error: callback is not a function', eventName, event.data)

  eventsTable[eventName](result)
  delete eventsTable[eventName]
}
