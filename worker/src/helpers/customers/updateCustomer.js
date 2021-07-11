import { getRecordByKey, putRecordByKey } from '../db'

import { put } from '../AJAX'

const {
  getCustomerDataError,
  putCustomerDataError
  // duplicatedCustomerError
} = require('../error-handlers').default

// import { getAllCustomers } from './'

export const updateCustomer = async function (id, data) {
  const route = 'customers'

  const response = await getRecordByKey('customers', id)

  if (response.status !== 200) return getCustomerDataError(response.status)

  const customer = Object.assign({}, response.result, data)

  const { phoneWork = '...', phoneMobile = '...', alternativeEmail = '...', status = 'status', approxETA = '...' } = customer

  Object.assign(customer, { phoneWork, phoneMobile, alternativeEmail, status, approxETA })

  const { status: remoteStatus } = await put(`customer/${id}`, customer)

  // if (remoteStatus === 409) return duplicatedCustomerError(409, customer.uniqueCode)

  if (remoteStatus !== 200) return putCustomerDataError(remoteStatus, customer.uniqueCode)

  const { status: localStatus } = await putRecordByKey('customers', id, customer)

  if (localStatus !== 200) return putCustomerDataError(localStatus, customer.uniqueCode)

  const res = await self.controller.getAllCustomers()

  if (res.status !== 200) return res

  return {
    status: 200,
    route,
    action: 'list',
    result: res.result,
    message: true,
    messageType: 'Customer details',
    messageText: `Customer ${customer.uniqueCode} details were successfully updated`
  }
}
