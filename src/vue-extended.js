import Vue from 'vue'

import {
  createController,
  createMapWorker,
  createRspWorker
} from '@/controllers'

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

// if (window.performance) console.info('window.performance OK')

// const sourceOrigin = process.env.NODE_ENV === 'production' ? 'https://portal.dgtek.net' : 'http://192.168.0.101:8081/'

// window.opener.postMessage('ready', sourceOrigin)

window[Symbol.for('api.host')] = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_HOST_PROD : process.env.VUE_APP_API_HOST_DEV

// window[Symbol.for('portal.entry')] = process.env.NODE_ENV === 'production' ? 'https://portal.dgtek.net' : 'http://192.168.0.101:8081/'

window[Symbol.for('portal.entry')] = 'https://portal.dgtek.net'

// if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
//   location.href = window[Symbol.for('portal.entry')]
// }

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

window[Symbol.for('vue.prototype')].mapWorker = window[Symbol.for('map.worker')]

createRspWorker()

createController()

export default Vue
