import { post } from '../AJAX'

import {
  postNewCustomerError,
  refreshCustomersListError,
  getCustomersListError
} from '../error-handlers'

import { getFromRemoteServer, getAllCustomers } from './'

export const createCustomer = async function (data) {
  const route = 'customers'

  const { status, result } = await post('customer', data)

  if (status !== 200) return postNewCustomerError(status, result)

  const { status: refreshStatus } = getFromRemoteServer()

  if (refreshStatus !== 200) return refreshCustomersListError(refreshStatus)

  const { status: listStatus, result: listResult } = getAllCustomers()

  if (listStatus !== 200) return getCustomersListError(listStatus)

  return {
    status,
    route,
    action: 'list',
    result: listResult,
    message: true,
    messageType: 'New customer',
    messageText: 'New customer has been successfully created'
  }
}
