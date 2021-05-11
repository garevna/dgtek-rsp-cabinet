import Vue from 'vue'

import { createController } from './controllers/createController'

import {
  events,
  createMapWorker,
  createRspWorker
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
    const { route, action } = event.data

    if (route !== routeName || event.data.action !== actionName) return

    window[Symbol.for('vue.prototype')].$dispatchProgressEvent(false)
    window[Symbol.for('vue.instance')].$root.$emit(events[route][action], event.data)
  })
}

Object.keys(events)
  .forEach(route => Object.keys(events[route]).forEach(action => Vue.prototype.$addWorkerListener(route, action)))

createController()

export default Vue
