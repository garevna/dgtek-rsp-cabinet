import { getAllRecords, getRecordByKey /*, putRecordByKey */ } from '../db'

const { getCustomersListError, getServiceDetailsError } = require('../error-handlers').default

export const getAllCustomers = async function () {
  const [route, action] = ['customers', 'list']

  const { status, result } = await getAllRecords('customers')

  if (status !== 200) return getCustomersListError(status)

  for (const customer of result) {
    if (!customer.services || !customer.services.length) continue

    const promises = customer.services.map(service => getRecordByKey('services', service.id))

    const response = await Promise.all(promises)

    const services = response.filter(response => response.status === 200).map(response => response.result)

    const errors = response.filter(response => response.status !== 200).map(response => response.result)

    if (errors.length) {
      self.postMessage(getServiceDetailsError(404))
      // for (const error of errors) {
      //   customer.services = customer.services.filter(service => service)
      // }
    }

    if (services.length) {
      Object.assign(customer, {
        serviceSpeed: `${services[0].upstreamSpeed}/${services[0].downstreamSpeed}`,
        serviceStatus: customer.services[0].status,
        servicePlan: services[0].subscriptionFee,
        serviceTerm: services[0].contractTerm
      })
    }
  }

  return { status, route, action, result }
}
