import Vue from './vue-extended'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import { auth } from './helpers'

import ErrorMessage from '@/components/popups/error.vue'
import Message from '@/components/popups/message.vue'
import Confirmation from '@/components/popups/Confirmation.vue'

import 'dgtek-portal-calculator/dist/dgtek-portal-calculator.umd.js'
import 'dgtek-portal-calculator/dist/dgtek-portal-calculator.css'

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

instance.sendMessageToWorker = function (message) {
  window[Symbol.for('vue.instance')].dispatchProgressEvent(true)
  window[Symbol.for('vue.instance')].__worker.postMessage(message)
}

Object.assign(Vue.prototype, {
  sendMessageToWorker: instance.sendMessageToWorker,
  $sendMessageToWorker: instance.sendMessageToWorker
})

window.onload = auth
