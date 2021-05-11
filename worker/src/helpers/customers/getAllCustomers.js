import { getAllRecords, getRecordByKey } from '../db'
import { getCustomersListError, getServiceDetailsError } from '../error-handlers'

export const getAllCustomers = async function () {
  const [route, action] = ['customers', 'list']

  const { status, result } = await getAllRecords('customers')

  // self.postMessage({ status: 300, route, action, result })

  if (status !== 200) return getCustomersListError(status)

  // self.postMessage({ status: 300, route, action, result })

  for (const customer of result) {
    if (!customer.services.length) continue

    const { status, result: service } = await getRecordByKey('services', customer.services[0].id)

    if (status !== 200) self.postMessage(getServiceDetailsError(status))

    // self.postMessage({ status: 300, route, action, result: service })

    Object.assign(customer, {
      serviceSpeed: `${service.upstreamSpeed}/${service.downstreamSpeed}`,
      serviceStatus: customer.services[0].status,
      servicePlan: service.subscriptionFee,
      serviceTerm: service.contractTerm
    })
  }

  return { status, route, action, result }
}
