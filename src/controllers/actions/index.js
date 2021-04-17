import { init } from './init'
import { credentials } from './credentials'

import { refreshClientData } from './rsp/refreshClientData'
import { getClientData } from './rsp/getClientData'
import { putClientData } from './rsp/putClientData'

import { refreshServices } from './services/refreshServices'
import { getServices } from './services/getServices'

import { refreshCustomers } from './customers/refreshCustomers'
import { getCustomers } from './customers/getCustomers'
import { getCustomerById } from './customers/getCustomerById'
import { putCustomer } from './customers/putCustomer'
import { postCustomer } from './customers/postCustomer'

import { refreshTickets } from './tickets/refreshTickets'

import { getTickets } from './tickets/getTickets'
import { getCategories } from './tickets/getCategories'
import { getTicketById } from './tickets/getTicketById'
import { postNewTicket } from './tickets/postNewTicket'
import { putTicketById } from './tickets/putTicketById'

export {
  init,
  credentials,
  refreshClientData,
  refreshCustomers,
  refreshServices,
  refreshTickets,
  getClientData,
  putClientData,
  getCustomers,
  getCustomerById,
  putCustomer,
  postCustomer,
  getServices,
  getTickets,
  getCategories,
  getTicketById,
  postNewTicket,
  putTicketById
}
