import Vue from './vue-extended'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import ErrorMessage from '@/components/popups/error.vue'
import Message from '@/components/popups/message.vue'

import { init } from '@/controllers/actions'
import { initCallback, refreshCallback } from '@/controllers/callbacks'

Vue.config.productionTip = false

Vue.component('error-message', ErrorMessage)
Vue.component('simple-message', Message)

const instance = new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

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

Vue.prototype.sendMessageToWorker = instance.sendMessageToWorker

instance.__worker.addEventListener('message', initCallback)
init()

/* ===================== MAP WORKER ========================= */

window[Symbol.for('map.worker')].addEventListener('message', function (event) {
  const { status, action, /* store, key, */ result } = event.data
  if (action !== 'getById' && action !== 'getByAddress') return
  if (status === 200) {
    const { _id, address, addressComponents, management, owner, status } = result
    console.log(result)
    window[Symbol.for('vue.instance')].$root.$emit('building-data-received', {
      _id,
      address,
      addressComponents,
      management,
      owner,
      status
    })
  } else {
    instance.$root.$emit('open-error-popup', {
      messageType: 'Reading the building details',
      messageText: 'Operaion faled. Data was not received'
    })
  }
})

window[Symbol.for('map.worker')].addEventListener('message', function (event) {
  const { status, action, store, result } = event.data
  if (action !== 'list') return
  if (status !== 200) {
    window[Symbol.for('vue.instance')].$root.$emit('open-error-popup', {
      messageType: `${store} buildings`,
      messageText: 'Error reading the data'
    })
    return
  }
  const eventName = `${store.toLowerCase()}-buildings-list`
  window[Symbol.for('vue.instance')].$root.$emit(eventName, result)
})

window[Symbol.for('map.worker')].addEventListener('message', function (event) {
  const { status, action, key, result } = event.data
  if (action !== 'put' && action !== 'post') return
  console.log('EVENT HANDLER\n', status, action, key, result)
  if (status === 200) {
    const eventName = action === 'post' ? 'new-building-created' : 'buildings-data-saved'
    console.log('EMIT EVENT: ', eventName)
    window[Symbol.for('vue.instance')].$root.$emit(eventName, event.data)
    instance.$root.$emit('open-message-popup', {
      messageType: 'Building details',
      messageText: 'Data saved'
    })
    return
  }
  instance.$root.$emit('open-error-popup', {
    messageType: 'Building details',
    messageText: 'Operaion faled. Data was not saved'
  })
})
