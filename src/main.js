import Vue from './vue-extended'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import ErrorMessage from '@/components/popups/error.vue'
import Message from '@/components/popups/message.vue'
import Confirmation from '@/components/popups/Confirmation.vue'
// import ServiceConnectionInfo from '@/components/popups/ServiceConnectionInfo.vue'

import { credentials } from '@/controllers/actions'

// import { init, credentials } from '@/controllers/actions'
// import { initCallback, refreshCallback } from '@/controllers/callbacks'

import { setBuildingHandlers } from '@/helpers/map.worker'

import {
  getWeekNumber,
  getWeekDay,
  getWeekStartDateByWeekNumber,
  getWeekEndDateByWeekNumber,
  getWeekDatesByWeekNumber
} from 'garevna-date-functions'

Object.assign(Vue.prototype, {
  getWeekNumber,
  getWeekDay,
  getWeekStartDateByWeekNumber,
  getWeekEndDateByWeekNumber,
  getWeekDatesByWeekNumber
})

/* eslint-disable no-extend-native */

String.prototype.toKebab = function () {
  return this.split(' ').join('-').split('')
    .map((char, index) => char.charCodeAt(0) < 91 && char.charCodeAt(0) > 64 ? `${index ? '-' : ''}${char.toLowerCase()}` : char)
    .join('').split('--').join('-')
}

String.prototype.fromKebab = function () {
  const string = this.split('-').join(' ')
  return `${string[0].toUpperCase()}${string.slice(1)}`
}

Vue.config.productionTip = false

Vue.component('error-message', ErrorMessage)
Vue.component('simple-message', Message)
Vue.component('confirmation-popup', Confirmation)
// Vue.component('service-connections-popup', ServiceConnectionInfo)

const instance = new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

instance.showMainMenu = true

window[Symbol.for('vue.instance')] = instance

instance.dispatchProgressEvent = function (value) {
  instance.$root.$emit('progress-event', { progress: value })
}

instance.__worker.dispatchProgressEvent = instance.dispatchProgressEvent

instance.sendMessageToWorker = function (message) {
  window[Symbol.for('vue.instance')].dispatchProgressEvent(true)
  window[Symbol.for('vue.instance')].__worker.postMessage(message)
}

Object.assign(Vue.prototype, {
  sendMessageToWorker: instance.sendMessageToWorker,
  $sendMessageToWorker: instance.sendMessageToWorker
})

const callback = event => {
  if (!event.data.credentials) return
  credentials(event)
  event.source.postMessage('OK', event.origin)
  window.removeEventListener('message', callback)
}

window.addEventListener('message', callback)

// window.addEventListener('message', (event) => {
//   if (!event.data.credentials) return
//   credentials(event)
//   event.source.postMessage('OK', event.origin)
// })

/* ===================== MAP WORKER ========================= */

setBuildingHandlers()
