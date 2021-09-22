import Vue from 'vue'

import {
  createController,
  createMapWorker,
  createRspWorker
} from './controllers'

import configPlugin from '../config'
Vue.use(configPlugin)

window[Symbol.for('global.addressData')] = {
  address: '',
  coordinates: null,
  buildingId: null,
  status: null,
  addressComponents: {},
  url: null
}

if (window.performance) console.info('window.performance OK')

const sourceOrigin = process.env.NODE_ENV === 'production' ? 'https://portal.dgtek.net' : 'http://192.168.0.100:8081/'

// window.opener.postMessage('ready', sourceOrigin)

if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
  location.href = sourceOrigin
}

window[Symbol.for('vue.prototype')] = Vue.prototype

window[Symbol.for('vue.prototype')].$refreshed = {
  settings: false,
  rsp: false,
  customers: false,
  tickets: false,
  services: false,
  messages: false
}

createMapWorker()
createRspWorker()

createController()

export default Vue
