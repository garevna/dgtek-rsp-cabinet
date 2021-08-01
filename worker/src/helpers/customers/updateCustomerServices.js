import { putRecordByKey } from '../db'

import { patch } from '../AJAX'

const updateServicesError = {
  error: true,
  errorType: 'Update customer services',
  errorMessage: 'Failed to update customer details'
}

export const updateCustomerServices = async function (customerId, services) {
  const { status, result } = await patch(`customer/${customerId}`, { services })

  if (status !== 200) return Object.assign({ status, result }, updateServicesError)

  await putRecordByKey('customers', customerId, result.data)

  return await self.controller.getAllCustomers()
}
