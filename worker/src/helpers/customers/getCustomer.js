import { getRecordByKey } from '../db'

const { getCustomerDataError } = require('../error-handlers').default

export const getCustomer = async function (id) {
  const { status, result: customer } = await getRecordByKey('customers', id)

  if (status !== 200) return getCustomerDataError(status)

  const { services = [] } = customer

  let index = 0

  const tested = []

  for (const service of services) {
    const { status, result } = await getRecordByKey('services', service.id)
    if (status !== 200) self.postDebugMessage({ error: 'Error: service is not available', serviceId: service.id, response: { status, result } })
    else tested.push(Object.assign(customer.services[index], { serviceName: result.serviceName }))
    index++
  }

  Object.assign(customer, { services: tested })

  return { status, route: 'customers', action: 'get', key: id, result: customer }
}
