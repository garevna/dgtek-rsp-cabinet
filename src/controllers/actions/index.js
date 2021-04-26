import { init } from './init'
import { credentials } from './credentials'

import {
  getClientData,
  putClientCredentials,
  putClientData,
  refreshClientData
} from './rsp'

import {
  refreshServices,
  getServices
} from './services'

import {
  deleteCustomer,
  getCustomerData,
  getCustomers,
  postCustomer,
  putCustomer,
  refreshCustomers
} from './customers'

import {
  getCategories,
  getTicketById,
  getTickets,
  postNewTicket,
  refreshTickets,
  saveTicketData
} from './tickets'

import {
  getBuildingByAddress,
  getBuildingById,
  getFootprintBuildings,
  getLitBuildings,
  postBuildingDetails,
  putBuildingDetails
} from './map.worker'

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
  saveTicketData,
  getBuildingByAddress,
  getBuildingById,
  getFootprintBuildings,
  getLitBuildings,
  postBuildingDetails,
  putBuildingDetails
}
