import { post } from '../AJAX'

import { postNewCustomerError } from '../error-handlers'

import { getFromRemoteServer, getAllCustomers } from './'

export const createCustomer = async function (data) {
  const route = 'customers'

  const { status, result } = await post('customer', data)

  if (status !== 200) return postNewCustomerError(status, result)

  const refresh = await getFromRemoteServer()

  if (refresh.status !== 200) return refresh

  const response = await getAllCustomers()

  // self.postMessage({ status: 300, route, action: 'list', response })

  if (response.status !== 200) return response

  return {
    status,
    route,
    action: 'list',
    result: response.result,
    message: true,
    messageType: 'New customer',
    messageText: 'New customer has been successfully created'
  }
}
