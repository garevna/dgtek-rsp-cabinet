import Vue from './vue-extended'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'

import ErrorMessage from '@/components/popups/error.vue'
import Message from '@/components/popups/message.vue'

// import configPlugin from '../config'
// Vue.use(configPlugin)

// window[Symbol.for('vue.constructor')] = Vue
//
// console.log(window[Symbol.for('vue.constructor')])

Vue.config.productionTip = false

Vue.component('error-message', ErrorMessage)
Vue.component('simple-message', Message)

Vue.prototype.__commit = function (mutation, data) {
  this.commit(mutation, data)
}.bind(store)

Vue.prototype.__dispatch = function (action, data) {
  this.dispatch(action, data)
}.bind(store)

const instance = new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

instance.dispatchProgressEvent = function (value) {
  instance.$emit('progress-event', { progress: value })
}

instance.__worker.dispatchProgressEvent = instance.dispatchProgressEvent

instance.sendMessageToWorker = function (message) {
  instance.dispatchProgressEvent(true)
  instance.__worker.postMessage(message)
}

instance.__worker.onmessage = function (event) {
  this.dispatchProgressEvent(false)
  const { status /* , action, result */ } = event.data

  if (status === 300) return console.log('WORKER DEBUGGING MESSAGE:\n', event.data)

  // if (action === 'init' || status !== 200) return
}

window[Symbol.for('vue.instance')] = instance
