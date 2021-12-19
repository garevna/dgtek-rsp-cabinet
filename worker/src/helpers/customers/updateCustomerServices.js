import { putRecordByKey } from '../db'
import { patch } from '../AJAX'

const [route, action] = ['customers', 'update']

const updateCustomerDetailsError = {
  error: true,
  errorType: 'Update customer services'
}

const remoteServerError = Object.assign(updateCustomerDetailsError, {
  errorMessage: 'Failed to update customer services: remote server error'
})

const localDBError = Object.assign(updateCustomerDetailsError, {
  errorMessage: 'Customer services updated remotelly, but failed to update in local DB'
})

export const updateCustomerServices = async function (customerId, services) {
  const { status, result } = await patch(`customer/${customerId}`, { services })

  if (status !== 200) return Object.assign({ route, action, status, result }, remoteServerError)

  const response = await putRecordByKey('customers', customerId, result.data)

  if (response.status !== 200) return Object.assign(response, { route, action }, localDBError)

  return { status: 200, route, action, result: result.data.services }
}
