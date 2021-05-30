import Vue from './vue-extended'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import ErrorMessage from '@/components/popups/error.vue'
import Message from '@/components/popups/message.vue'

import { init } from '@/controllers/actions'
import { initCallback, refreshCallback } from '@/controllers/callbacks'

import { setBuildingHandlers } from '@/helpers/map.worker'

import {
  getWeekDay,
  getWeekNumber,
  getWeekStartDate,
  getWeekEndDate,

  getFormattedISODate,
  getFormattedDate,

  getNextWeekDate,
  getPrevWeekDate,

  getWeekStartDateByWeekNumber,
  getWeekEndDateByWeekNumber,
  getWeekDatesByWeekNumber
} from 'garevna-date-functions'

Object.assign(Vue.prototype, {
  getWeekDay,
  getWeekNumber,
  getWeekStartDate,
  getWeekEndDate,

  getFormattedISODate,
  getFormattedDate,

  getNextWeekDate,
  getPrevWeekDate,

  getWeekStartDateByWeekNumber,
  getWeekEndDateByWeekNumber,
  getWeekDatesByWeekNumber
})

Vue.config.productionTip = false

Vue.component('error-message', ErrorMessage)
Vue.component('simple-message', Message)

const instance = new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

instance.showMainMenu = true

window[Symbol.for('vue.instance')] = instance

instance.dispatchProgressEvent = function (value) {
  instance.$root.$emit('progress-event', { progress: value })
}

window[Symbol.for('rsp.worker')].addEventListener('message', refreshCallback)

instance.__worker.dispatchProgressEvent = instance.dispatchProgressEvent

instance.sendMessageToWorker = function (message) {
  window[Symbol.for('vue.instance')].dispatchProgressEvent(true)
  window[Symbol.for('vue.instance')].__worker.postMessage(message)
}

Object.assign(Vue.prototype, {
  sendMessageToWorker: instance.sendMessageToWorker,
  $sendMessageToWorker: instance.sendMessageToWorker
})

instance.__worker.addEventListener('message', initCallback)

init()

/* ===================== MAP WORKER ========================= */

setBuildingHandlers()
