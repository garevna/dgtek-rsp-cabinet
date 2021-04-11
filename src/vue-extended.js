import Vue from 'vue'

import {
  getClientData,
  getCustomers,
  getCustomerById,
  putCustomer,
  getTickets,
  getServices,
  putClientData
} from './controllers/actions'

import { createMapWorker, createRspWorker } from '@/helpers'

import configPlugin from '../config'
Vue.use(configPlugin)

window[Symbol.for('vue.prototype')] = Vue.prototype

createMapWorker()
createRspWorker()

Object.assign(Vue.prototype, {
  __getClientData: () => getClientData(),
  __putClientData: (data) => putClientData(data),
  __getCustomers: () => getCustomers(),
  __getCustomer: (id) => getCustomerById(id),
  __putCustomer: (id, data) => putCustomer(id, data),
  __getTickets: () => getTickets(),
  __getServices: () => getServices()
})

Vue.prototype.__addListener = function (route, eventName, callback) {
  window[Symbol.for('rsp.worker')].addEventListener('message', function (event) {
    if (event.data.status === 300) return
    if (event.data.route !== route || event.data.action !== eventName) return

    Vue.prototype.__commit('SET_REQUEST_FLAG', { route, status: false })
    Vue.prototype.__commit('SET_PROGRESS')

    if (event.data.status !== 200) {
      Vue.prototype.__commit('ERROR', {
        error: true,
        errorType: `${event.data.route}: ${event.data.action} / ${event.data.key || ''}`,
        errorMessage: event.data.result
      })
      return
    }

    callback(event.data.result)
  })
}

Object.assign(Vue.prototype, {
  __addClientGetListener: callback => Vue.prototype.__addListener('rsp', 'get', callback),
  __addClientPutListener: callback => Vue.prototype.__addListener('rsp', 'put', callback),
  __addCustomersListListener: callback => Vue.prototype.__addListener('customers', 'list', callback),
  __addCustomerGetListener: callback => Vue.prototype.__addListener('customers', 'get', callback),
  __addCustomerPutListener: callback => Vue.prototype.__addListener('customers', 'put', callback),
  __addServicesListListener: callback => Vue.prototype.__addListener('services', 'get', callback),
  __addTicketsListListener: callback => Vue.prototype.__addListener('tickets', 'list', callback)
})

export default Vue
