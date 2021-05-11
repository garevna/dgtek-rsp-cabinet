import Vue from 'vue'

import { createController } from './controllers/createController'

import {
  createMapWorker,
  createRspWorker
} from './controllers'

import { rspWorkerEvents } from '@/controllers/events'

import configPlugin from '../config'
Vue.use(configPlugin)

window[Symbol.for('vue.prototype')] = Vue.prototype

createMapWorker()
createRspWorker()

Vue.prototype.$addWorkerListener = function (routeName, actionName) {
  this.__worker.addEventListener('message', function (event) {
    const { route, action } = event.data

    if (route !== routeName || event.data.action !== actionName) return

    window[Symbol.for('vue.prototype')].$dispatchProgressEvent(false)
    window[Symbol.for('vue.instance')].$root.$emit(rspWorkerEvents[route][action], event.data)
  })
}

// Object.keys(rspWorkerEvents)
//   .forEach(route => Object.keys(rspWorkerEvents[route]).forEach(action => Vue.prototype.$addWorkerListener(route, action)))

createController()

export default Vue
