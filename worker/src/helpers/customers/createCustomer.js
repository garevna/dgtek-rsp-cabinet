import { get, post } from '../AJAX'
import { searchRecords, putRecordByKey } from '../db'

const {
  getCustomerDataError,
  putCustomerDataError,
  postNewCustomerError,
  duplicatedCustomerError
} = require('../error-handlers').default

// import { getFromRemoteServer, getAllCustomers } from './'

export const createCustomer = async function (data) {
  const route = 'customers'

  const duplicated = await searchRecords('customers', 'uniqueCode', data.uniqueCode)

  self.postMessage({ status: 300, duplicated })

  if (duplicated.result.length > 0) return duplicatedCustomerError(409, data.uniqueCode)

  const { status, result } = await post('customer', data)

  if (status === 409) return duplicatedCustomerError(409, data.uniqueCode)

  if (status !== 200) return postNewCustomerError(status, data.uniqueCode)

  self.postMessage({ status: 300, message: 'New cutomer created', id: result.data, result })

  self.postMessage({ status: 200, route: 'customers', action: 'post', result: result.data })

  const customer = await get(`customer/${result.data}`)

  self.postMessage({ status: 300, message: 'New customer received from remote', customer: customer.result })

  if (customer.status !== 200) return getCustomerDataError(customer.status, customer.uniqueCode)

  const newCustomer = await putRecordByKey('customers', result.data, customer.result)

  if (newCustomer.status !== 200) return putCustomerDataError(newCustomer.status)

  const response = await self.controller.getAllCustomers()

  if (response.status !== 200) return response

  return {
    status,
    route,
    action: 'list',
    result: response.result,
    message: true,
    messageType: 'New customer',
    messageText: `New customer ${data.uniqueCode} has been successfully created. Please don't forget to assign a service.`
  }
}
