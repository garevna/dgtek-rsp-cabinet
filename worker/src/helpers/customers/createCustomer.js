import { get, post } from '../AJAX'
import { searchRecords, putRecordByKey } from '../db'

const {
  getCustomerDataError,
  putCustomerDataError,
  postNewCustomerError,
  duplicatedCustomerError
} = require('../error-handlers').default

const [route, action] = ['customers', 'post']

export const createCustomer = async function (data) {
  const duplicated = await searchRecords('customers', 'uniqueCode', data.uniqueCode)

  if (duplicated.result.length > 0) return duplicatedCustomerError(409, data.uniqueCode)

  const { status, result } = await post('customer', data)

  if (status === 409) return duplicatedCustomerError(409, data.uniqueCode)
  if (status !== 200) return postNewCustomerError(status, data.uniqueCode)

  const customer = await get(`customer/${result.data}`)

  if (customer.status !== 200) return getCustomerDataError(customer.status, customer.uniqueCode)

  const newCustomer = await putRecordByKey('customers', result.data, customer.result)

  if (newCustomer.status !== 200) return putCustomerDataError(newCustomer.status)

  return {
    status,
    route,
    action,
    result: result.data,
    message: true,
    messageType: 'New customer',
    messageText: `New customer ${data.uniqueCode} has been successfully created. Please don't forget to assign a service.`
  }
}
