import Vue from './vue-extended'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import ErrorMessage from '@/components/popups/error.vue'
import Message from '@/components/popups/message.vue'
import Confirmation from '@/components/popups/Confirmation.vue'

// import { credentials } from '@/controllers/actions'
import { actions } from '@/controllers/actions'

import { setBuildingHandlers } from '@/helpers/map.worker'

// import { createController } from './controllers'

import {
  getWeekNumber,
  getWeekDay,
  getWeekStartDateByWeekNumber,
  getWeekEndDateByWeekNumber,
  getWeekDatesByWeekNumber
} from 'garevna-date-functions'

// import 'dgtek-google-autocomplete'

Object.assign(Vue.prototype, {
  getWeekNumber,
  getWeekDay,
  getWeekStartDateByWeekNumber,
  getWeekEndDateByWeekNumber,
  getWeekDatesByWeekNumber
})

const { credentials } = actions

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

window.onload = (event) => {
  if (location.hash.slice(1)) {
    credentials(location.hash.slice(1))
    location.hash = ''
  }
}

window[Symbol.for('api.host')] = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_HOST_PROD : process.env.VUE_APP_API_HOST_DEV

console.log(window[Symbol.for('api.host')])

// window.addEventListener('new-address-data', function (event) {
//   const { address, addressComponents, status, url, coordinates } = event.detail
//   console.log(address, addressComponents, status, url, coordinates)
// })

/* ===================== MAP WORKER ========================= */

setBuildingHandlers()
