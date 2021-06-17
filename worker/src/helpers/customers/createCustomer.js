import { post } from '../AJAX'

const { postNewCustomerError, duplicatedCustomerError } = require('../error-handlers').default

// import { getFromRemoteServer, getAllCustomers } from './'

export const createCustomer = async function (data) {
  const route = 'customers'

  const { status, result } = await post('customer', data)

  if (status === 409) return duplicatedCustomerError(409, data.uniqueCode)

  if (status !== 200) return postNewCustomerError(status, data.uniqueCode)

  self.postMessage({ status: 300, message: 'New cutomer created', result })

  const refresh = await self.controller.getFromRemoteServer()

  if (refresh.status !== 200) return refresh

  const response = await self.controller.getAllCustomers()

  if (response.status !== 200) return response

  return {
    status,
    route,
    action: 'list',
    result: response.result,
    message: true,
    messageType: 'New customer',
    messageText: `New customer ${data.uniqueCode} has been successfully created`
  }
}
