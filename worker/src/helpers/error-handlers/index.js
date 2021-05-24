import {
  getCategoriesError,
  getTicketDataError,
  getTicketsListError,
  postNewTicketError,
  putTicketDataError,
  refreshTicketsListError
} from './tickets'

import {
  refreshServicesListError,
  getServicesListError,
  getServiceDetailsError
} from './services'

import {
  getClientDataError,
  putClientCredentialsError,
  putClientDataError,
  refreshClientDataError
} from './rsp'

import {
  deleteCustomerError,
  getCustomerDataError,
  getCustomersListError,
  postNewCustomerError,
  putCustomerDataError,
  refreshCustomersListError,
  activateServiceRequestError,
  schedulingServiceRequestError
} from './customers'

export {
  refreshClientDataError,
  getClientDataError,
  putClientDataError,
  putClientCredentialsError,

  refreshCustomersListError,
  getCustomersListError,
  getCustomerDataError,
  postNewCustomerError,
  putCustomerDataError,
  deleteCustomerError,
  activateServiceRequestError,
  schedulingServiceRequestError,

  refreshTicketsListError,
  getCategoriesError,
  getTicketsListError,
  getTicketDataError,
  postNewTicketError,
  putTicketDataError,

  refreshServicesListError,
  getServicesListError,
  getServiceDetailsError
}
