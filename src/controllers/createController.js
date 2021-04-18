import * as actions from './actions'

export const createController = function () {
  Object.assign(window[Symbol.for('vue.prototype')], {
    __refreshClientData: actions.refreshClientData,
    __getClientData: actions.getClientData,
    __putClientData: (data) => actions.putClientData(data),
    __putClientCredentials: (data) => actions.putClientCredentials(data),

    __refreshCustomers: actions.refreshCustomers,
    __getCustomers: actions.getCustomers,
    __getCustomerData: actions.getCustomerData,
    __putCustomer: actions.putCustomer,
    __postCustomer: actions.postCustomer,
    __deleteCustomer: actions.deleteCustomer,

    __refreshTickets: actions.refreshTickets,
    __getTickets: actions.getTickets,
    __getCategories: actions.getCategories,
    __getTicketData: actions.getTicketById,
    __saveTicketData: actions.saveTicketData,
    __postNewTicket: actions.postNewTicket,

    __refreshServices: actions.refreshServices,
    __getServices: actions.getServices
  })

  Object.assign(window[Symbol.for('vue.prototype')], {
    __getBuildingById: function (id) {
      window[Symbol.for('map.worker')].postMessage({ action: 'getById', key: id })
    },
    __getBuildingByAddress: function (address) {
      window[Symbol.for('map.worker')].postMessage({ action: 'getByAddress', key: address })
    },
    __getLitBuildings: function () {
      window[Symbol.for('map.worker')].postMessage({ action: 'list', key: 'lit' })
    },
    __getFootprintBuildings: function () {
      window[Symbol.for('map.worker')].postMessage({ action: 'list', key: 'footprint' })
    },
    __putBuildingDetails: function (id, details) {
      window[Symbol.for('map.worker')].postMessage({ action: 'put', key: id, data: details })
    }
  })
}
