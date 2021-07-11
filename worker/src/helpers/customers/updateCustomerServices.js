// import { getRecordByKey, putRecordByKey } from '../db'

import { patch } from '../AJAX'

const updateServicesError = {
  error: true,
  errorType: 'Update customer services',
  errorMessage: 'Failed to update customer details'
}

export const updateCustomerServices = async function (customerId, services) {
  self.postDebugMessage({ customerId, services })

  const { status, result } = await patch(`customer/${customerId}`, { services })

  self.postDebugMessage({ route: 'customers', action: 'services', result: { status, result } })

  if (status !== 200) return Object.assign({ status, result }, updateServicesError)

  // const customer = result.data

  // if (customer.services.length) {
  //   const { status: serviceStatus, result: service } = await getRecordByKey('services', customer.services[0].id)
  //   if (serviceStatus === 200) {
  //     Object.assign(customer, {
  //       serviceSpeed: `${service.upstreamSpeed}/${service.downstreamSpeed}`,
  //       serviceStatus: customer.services[0].status,
  //       servicePlan: service.subscriptionFee,
  //       serviceTerm: service.contractTerm
  //     })
  //   }
  // }

  return await self.controller.refreshCustomers()
}
