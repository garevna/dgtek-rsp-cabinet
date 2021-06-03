import { getRecordByKey, putRecordByKey } from '../db'

import { put } from '../AJAX'

import {
  getCustomerDataError,
  putCustomerDataError
} from '../error-handlers'

import { getAllCustomers } from './'

export const updateCustomer = async function (id, data) {
  const route = 'customers'

  const response = await getRecordByKey('customers', id)

  if (response.status !== 200) return getCustomerDataError(response.status)

  const customer = Object.assign({}, response.result, data)

  const { phoneWork = '...', phoneMobile = '...', alternativeEmail = '...', status = 'status', approxETA = '...' } = customer

  Object.assign(customer, { phoneWork, phoneMobile, alternativeEmail, status, approxETA })

  const { status: localStatus } = await putRecordByKey('customers', id, customer)

  if (localStatus !== 200) return putCustomerDataError(localStatus)

  const { status: putStatus, result } = await put(`customer/${id}`, customer)

  if (putStatus !== 200) return putCustomerDataError(putStatus, result)

  const res = await getAllCustomers()

  if (res.status !== 200) return res

  return {
    status: 200,
    route,
    action: 'list',
    result: res.result,
    message: true,
    messageType: 'Customer details',
    messageText: 'Customer details were successfully updated'
  }
}
