import { refreshTicketsListError } from './tickets/refreshTicketsList'
import { getTicketsListError } from './tickets/getTicketsList'
import { getTicketDataError } from './tickets/getTicketData'
import { postNewTicketError } from './tickets/postNewTicket'
import { putTicketDataError } from './tickets/putTicketData'

import { refreshServicesListError } from './services/refreshServicesList'
import { getServicesListError } from './services/getServicesList'
import { putServicesListError } from './services/putServicesList'

import { refreshClientDataError } from './rsp/refreshClientData'
import { getClientDataError } from './rsp/getClientData'
import { putClientDataError } from './rsp/putClientData'
import { putClientCredentialsError } from './rsp/putClientCredentials'

import { refreshCustomersListError } from './customers/refreshCustomersList'
import { getCustomersListError } from './customers/getCustomersList'
import { getCustomerDataError } from './customers/getCustomerData'
import { postNewCustomerError } from './customers/postNewCustomer'
import { putCustomerDataError } from './customers/putCustomerData'
import { deleteCustomerError } from './customers/deleteCustomer'

export {
  getClientDataError,
  putClientDataError,
  putClientCredentialsError,
  getCustomersListError,
  getCustomerDataError,
  postNewCustomerError,
  putCustomerDataError,
  deleteCustomerError,
  getTicketsListError,
  getTicketDataError,
  postNewTicketError,
  putTicketDataError,
  getServicesListError,
  putServicesListError,
  refreshClientDataError,
  refreshCustomersListError,
  refreshServicesListError,
  refreshTicketsListError
}
