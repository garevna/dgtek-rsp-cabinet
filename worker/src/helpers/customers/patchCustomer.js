import { putRecordByKey } from '../db'
import { patch } from '../AJAX'

const [route, action] = ['customers', 'patch']

const patchCustomerError = {
  error: true,
  errorType: 'Update customer details'
}

const remoteServerError = Object.assign(patchCustomerError, {
  errorMessage: 'Failed to update customer details: remote server error'
})

const localDBError = Object.assign(patchCustomerError, {
  errorMessage: 'Customer details updated remotelly, but failed to update in local DB'
})

export const patchCustomer = async function (customerId, data) {
  const { status, result } = await patch(`customer/${customerId}`, data)

  if (status !== 200) return Object.assign({ route, action, status, result }, remoteServerError)

  await self.controller.sendNotification('customer', customerId, Object.keys(data))

  const response = await putRecordByKey('customers', customerId, result.data)

  if (response.status !== 200) return Object.assign(response, { route, action }, localDBError)

  return { status: 200, route, action, result: result.data }
}
