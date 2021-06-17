// import {
//   getCategoriesError,
//   getTicketDataError,
//   getTicketsListError,
//   postNewTicketError,
//   putTicketDataError,
//   refreshTicketsListError
// } from './tickets'

// import {
//   refreshServicesListError,
//   getServicesListError,
//   getServiceDetailsError
// } from './services'

// import {
//   credentialsError,
//   getClientDataError,
//   putClientCredentialsError,
//   putClientDataError,
//   refreshClientDataError
// } from './rsp'

// import {
//   deleteCustomerError,
//   getCustomerDataError,
//   getCustomersListError,
//   postNewCustomerError,
//   putCustomerDataError,
//   refreshCustomersListError,
//   activateServiceRequestError,
//   schedulingServiceRequestError,
//   invalidServiceDeliveryStatusRequest
// } from './customers'

// export {
//   credentialsError,
//   refreshClientDataError,
//   getClientDataError,
//   putClientDataError,
//   putClientCredentialsError,
//
//   refreshCustomersListError,
//   getCustomersListError,
//   getCustomerDataError,
//   postNewCustomerError,
//   putCustomerDataError,
//   deleteCustomerError,
//   activateServiceRequestError,
//   schedulingServiceRequestError,
//   invalidServiceDeliveryStatusRequest,
//
//   refreshTicketsListError,
//   getCategoriesError,
//   getTicketsListError,
//   getTicketDataError,
//   postNewTicketError,
//   putTicketDataError,
//
//   refreshServicesListError,
//   getServicesListError,
//   getServiceDetailsError
// }

// import { credentialsError } from './admin/credentialsError'

import ticketsErrors from './tickets'

import servicesErrors from './services'

import rspErrors from './rsp'

import customersErrors from './customers'

// import scheduleErrors from './schedule'

const result = Object.assign({}, ticketsErrors, servicesErrors, rspErrors, customersErrors)

export default result
