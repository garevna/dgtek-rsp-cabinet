import { deleteCustomer } from './deleteCustomer'
import { createCustomer } from './createCustomer'
import { updateCustomer } from './updateCustomer'
import { updateCustomerServices } from './updateCustomerServices'
import { getCustomer } from './getCustomer'
import { getAllCustomers } from './getAllCustomers'
import { getFromRemoteServer } from './getFromRemoteServer'
import { activateServiceRequest } from './activateServiceRequest'
import { updateServiceStatus } from './updateServiceStatus'
import { schedulingRequest } from './schedulingRequest'

import { getAllActiveServices } from './getAllActiveServices'

import { getShortListOfCustomers } from './getShortListOfCustomers'

export {
  getFromRemoteServer,
  getAllCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  updateCustomerServices,
  activateServiceRequest,
  updateServiceStatus,
  schedulingRequest,

  getAllActiveServices,

  getShortListOfCustomers
}
