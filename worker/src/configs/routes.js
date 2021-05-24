const {
  cryptoController,
  customersController,
  servicesController,
  ticketsController,
  rspController
} = require('../controllers')

export const routes = {
  rsp: {
    credentials: rspController.credentials,
    password: rspController.passwordChange,
    refresh: rspController.refresh,
    get: rspController.get,
    put: rspController.update
  },
  customers: {
    refresh: customersController.getFromRemote,
    list: customersController.getAllCustomers,
    services: customersController.updateCustomerServices,
    get: customersController.getCustomer,
    post: customersController.createCustomer,
    delete: customersController.deleteCustomer,
    put: customersController.updateCustomer,
    activate: customersController.activateServiceRequest,
    scheduling: customersController.scheduling
  },
  crypto: {
    init: cryptoController.init,
    encrypt: cryptoController.encrypt,
    decrypt: cryptoController.decrypt
  },
  services: {
    refresh: servicesController.refresh,
    list: servicesController.list,
    get: servicesController.get
  },
  schedule: {
    get: servicesController.getFreeLotsForSchedule
  },
  tickets: {
    refresh: ticketsController.refresh,
    list: ticketsController.list,
    get: ticketsController.get,
    post: ticketsController.post,
    put: ticketsController.put
  },
  categories: {
    get: ticketsController.getCategories
  }
}
