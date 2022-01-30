import { getRecordByKey, putRecordByKey } from '../db'

import { put } from '../AJAX'

const {
  getCustomerDataError,
  putCustomerDataError
} = require('../error-handlers').default

const [route, action] = ['customers', 'put']

export const updateCustomer = async function (id, data) {
  const response = await getRecordByKey('customers', id)

  if (response.status !== 200) return getCustomerDataError(response.status)

  const customer = Object.assign({}, response.result, data)

  const { phoneWork = '...', phoneMobile = '...', alternativeEmail = '...', status = 'status', approxETA = '...' } = customer

  Object.assign(customer, { phoneWork, phoneMobile, alternativeEmail, status, approxETA })

  const { status: remoteStatus, result } = await put(`customer/${id}`, customer)

  if (remoteStatus !== 200) return putCustomerDataError(remoteStatus, customer.uniqueCode)

  await self.controller.sendNotification('customer', id)

  const { status: localStatus } = await putRecordByKey('customers', id, customer)

  if (localStatus !== 200) return putCustomerDataError(localStatus, customer.uniqueCode)

  return {
    status: 200,
    route,
    action,
    result,
    message: true,
    messageType: 'Customer details',
    messageText: `Customer ${customer.uniqueCode} details were successfully updated`
  }
}
