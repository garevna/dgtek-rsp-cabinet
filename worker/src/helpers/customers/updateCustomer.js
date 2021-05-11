import { getRecordByKey, putRecordByKey } from '../db'

import { put } from '../AJAX'

import {
  getCustomerDataError,
  putCustomerDataError
} from '../error-handlers'

import { getAllCustomers } from './'

export const updateCustomer = async function (id, data) {
  const route = 'customers'

  const { status: getStatus, result: getResult } = await getRecordByKey('customers', id)

  if (getStatus !== 200) return getCustomerDataError(getStatus)

  const response = Object.assign({}, getResult, data)

  const { status: putStatus } = await putRecordByKey('customers', id, response)

  if (putStatus !== 200) return putCustomerDataError(putStatus)

  const { status, result } = await put(`customer/${id}`, response)

  if (status !== 200) return putCustomerDataError(status, result)

  const listResponse = await getAllCustomers()

  if (listResponse.status !== 200) return listResponse

  return {
    status,
    route,
    action: 'list',
    result: listResponse.result,
    message: true,
    messageType: 'Customer details',
    messageText: 'Customer details were successfully updated'
  }
}
