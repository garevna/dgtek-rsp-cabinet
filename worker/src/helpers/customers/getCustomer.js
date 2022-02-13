import { getRecordByKey } from '../db'

const { getCustomerDataError } = require('../error-handlers').default

const [route, action] = ['customers', 'get']

const serviceError = {
  status: 404,
  route,
  action,
  error: true,
  errorType: 'Customer services'
}

export const getCustomer = async function (id) {
  const { status, result: customer } = await getRecordByKey('customers', id)

  if (status !== 200) return getCustomerDataError(status)

  const { services = [] } = customer

  let index = 0

  const tested = []

  for (const service of services) {
    if (!service.id) {
      self.postMessage(Object.assign({}, serviceError, { errorMessage: 'Service id is not defined' }))
      continue
    }

    const { status, result } = await getRecordByKey('services', service.id)

    if (status !== 200) {
      self.postMessage(Object.assign({}, serviceError, { errorMessage: `Service ${service.id} is not available` }))
      tested.push(Object.assign(customer.services[index], { serviceName: 'Unknown' }))
    } else tested.push(Object.assign(customer.services[index], { serviceName: result.serviceName }))
    index++
  }

  Object.assign(customer, { services: JSON.parse(JSON.stringify(tested)) })

  return { status, route, action, key: id, result: customer }
}
