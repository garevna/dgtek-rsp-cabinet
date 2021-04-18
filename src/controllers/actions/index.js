import { init } from './init'
import { credentials } from './credentials'

import { refreshClientData } from './rsp/refreshClientData'
import { getClientData } from './rsp/getClientData'
import { putClientData } from './rsp/putClientData'
import { putClientCredentials } from './rsp/putClientCredentials'

import { refreshServices } from './services/refreshServices'
import { getServices } from './services/getServices'

import { refreshCustomers } from './customers/refreshCustomers'
import { getCustomers } from './customers/getCustomers'
import { getCustomerData } from './customers/getCustomerData'
import { putCustomer } from './customers/putCustomer'
import { postCustomer } from './customers/postCustomer'
import { deleteCustomer } from './customers/deleteCustomer'

import { refreshTickets } from './tickets/refreshTickets'

import { getTickets } from './tickets/getTickets'
import { getCategories } from './tickets/getCategories'
import { getTicketById } from './tickets/getTicketById'
import { postNewTicket } from './tickets/postNewTicket'
import { saveTicketData } from './tickets/saveTicketData'

export {
  init,
  credentials,
  refreshClientData,
  refreshCustomers,
  refreshServices,
  refreshTickets,
  getClientData,
  putClientData,
  putClientCredentials,
  getCustomers,
  getCustomerData,
  putCustomer,
  postCustomer,
  deleteCustomer,
  getServices,
  getTickets,
  getCategories,
  getTicketById,
  postNewTicket,
  saveTicketData
}
