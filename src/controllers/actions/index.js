import { init } from './init'
import { credentials } from './credentials'

import { refreshMessages } from './dashboard'

import { getFreeLotsOfSchedule } from './getFreeLotsOfSchedule'

import {
  getClientData,
  putClientCredentials,
  putClientData,
  refreshClientData
} from './rsp'

import {
  refreshServices,
  getServices,
  getServiceById,
  getSLAContent
} from './services'

import {
  deleteCustomer,
  getCustomerData,
  getCustomers,
  postCustomer,
  putCustomer,
  updateCustomerServices,
  refreshCustomers,
  sendServiceActivationRequest,
  sendSchedulingRequest,
  getCustomersServicesInfo,
  getCustomersListForTicket,
  getFilteredShortListOfCustomers
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
  getBuildingsByStatus,
  getAddressListByStatus,
  postBuildingDetails,
  putBuildingDetails
} from './map.worker'

export {
  init,

  credentials,
  refreshMessages,
  refreshClientData,
  refreshCustomers,
  refreshServices,
  refreshTickets,

  getCustomersServicesInfo,

  getClientData,
  putClientData,
  putClientCredentials,

  getCustomers,
  getCustomerData,
  putCustomer,
  postCustomer,
  deleteCustomer,
  updateCustomerServices,
  sendServiceActivationRequest,
  sendSchedulingRequest,
  getCustomersListForTicket,
  getFilteredShortListOfCustomers,

  getServices,
  getServiceById,
  getSLAContent,

  getTickets,
  getCategories,
  getTicketById,
  postNewTicket,
  saveTicketData,

  getBuildingByAddress,
  getBuildingById,
  getBuildingsByStatus,
  getAddressListByStatus,
  postBuildingDetails,
  putBuildingDetails,

  getFreeLotsOfSchedule
}
