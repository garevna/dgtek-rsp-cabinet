import Vue from 'vue'

import { createController } from './controllers/createController'

import {
  createMapWorker,
  createRspWorker,
  events
} from './controllers'

import configPlugin from '../config'
Vue.use(configPlugin)

window[Symbol.for('vue.prototype')] = Vue.prototype

createMapWorker()
createRspWorker()

Vue.prototype.$dispatchProgressEvent = function (value) {
  window[Symbol.for('vue.instance')].$root.$emit('progress-event', value)
}

Vue.prototype.$addWorkerListener = function (routeName, actionName) {
  this.__worker.addEventListener('message', function (event) {
    const { status, route, action /*, result */ } = event.data

    if (route !== routeName || event.data.action !== actionName) return

    // event.stopImmediatePropagation()

    console.log('LISTENER', route, action, status, '\nEVENT: ', events[route][action])

    window[Symbol.for('vue.prototype')].$dispatchProgressEvent(false)
    window[Symbol.for('vue.instance')].$root.$emit(events[route][action], event.data)
  })
}

Object.keys(events)
  .forEach(route => Object.keys(events[route]).forEach(action => Vue.prototype.$addWorkerListener(route, action)))

Vue.prototype.$sendMessageToWorker = function (message) {
  const { route, action, key, data } = message
  window[Symbol.for('vue.prototype')].$dispatchProgressEvent(true)
  window[Symbol.for('vue.prototype')].__worker.postMessage({ route, action, key, data })
}

createController()

export default Vue
