import Vue from './vue-extended'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import ErrorMessage from '@/components/popups/error.vue'
import Message from '@/components/popups/message.vue'
import Confirmation from '@/components/popups/Confirmation.vue'

import { auth } from './helpers'

// import { setBuildingHandlers } from '@/helpers/map.worker'

// import { createController } from '@/controllers'

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

Vue.config.productionTip = false

Vue.component('error-message', ErrorMessage)
Vue.component('simple-message', Message)
Vue.component('confirmation-popup', Confirmation)

const instance = new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

window[Symbol.for('vue.instance')] = instance

instance.showMainMenu = true

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

window.onload = auth

// createController()

// console.log(window[Symbol.for('portal.entry')])

// window.addEventListener('new-address-data', function (event) {
//   const { address, addressComponents, status, url, coordinates } = event.detail
//   console.log(address, addressComponents, status, url, coordinates)
// })

/* ===================== MAP WORKER ========================= */

// setBuildingHandlers()
