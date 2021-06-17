import { getAllRecords, getRecordByKey } from '../db'

const { getCustomersListError, getServiceDetailsError } = require('../error-handlers').default

export const getAllCustomers = async function () {
  const [route, action] = ['customers', 'list']

  const { status, result } = await getAllRecords('customers')

  if (status !== 200) return getCustomersListError(status)

  for (const customer of result) {
    if (!customer.services || !customer.services.length) continue

    const { status, result: service } = await getRecordByKey('services', customer.services[0].id)

    if (status !== 200) self.controller.postMessage(getServiceDetailsError(status))

    Object.assign(customer, {
      serviceSpeed: `${service.upstreamSpeed}/${service.downstreamSpeed}`,
      serviceStatus: customer.services[0].status,
      servicePlan: service.subscriptionFee,
      serviceTerm: service.contractTerm
    })
  }

  return { status, route, action, result }
}
