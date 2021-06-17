import { getRecordByKey } from '../db'

const { getCustomerDataError } = require('../error-handlers').default

export const getCustomer = async function (id) {
  const { status, result: customer } = await getRecordByKey('customers', id)

  if (status !== 200) return getCustomerDataError(status)

  const { services } = customer

  let index = 0

  for (const service of services) {
    const { status, result } = await getRecordByKey('services', service.id)
    status === 200 && Object.assign(customer.services[index++], { serviceName: result.serviceName })
  }
  Object.assign(customer, { services })

  return { status, route: 'customers', action: 'get', key: id, result: customer }
}
