import { workerController } from './workerController'

export const routes = {
  init: workerController.init,
  credentials: workerController.credentials,
  refresh: workerController.refreshAllData,
  rsp: {
    get: window[Symbol.for('vue.prototype')].getClientData,
    put: workerController.putClientData
  },
  customers: {
    list: workerController.getCustomersList,
    post: workerController.createNewCustomer,
    remove: workerController.removeCustomer,
    get: workerController.getCustomerData,
    put: workerController.putCustomerData
  },
  tickets: {
    list: workerController.getTicketsList,
    post: workerController.createNewTicket,
    get: workerController.getTicketData,
    put: workerController.putTicketData
  },
  services: {
    list: workerController.getServicesList,
    get: workerController.getServiceData
  }
}
