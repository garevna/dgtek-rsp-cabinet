import { getRecordByKey } from '../db'
import { getCustomerDataError } from '../error-handlers'

export const getCustomer = async function (id) {
  const [route, action] = ['customers', 'get']

  // self.postMessage({ status: 300, route, action, key: `customer id: ${id}` })

  const { status, result } = await getRecordByKey('customers', id)

  if (status !== 200) return getCustomerDataError(status)

  const { services } = result

  services.forEach(async (service, index) => {
    const { status, result } = await getRecordByKey('services', service.id)
    // self.postMessage({ status: 300, route, action, key: `service: ${service.id}`, result })

    if (status !== 200) {
      self.postMessage({
        status,
        route,
        action,
        key: `service: ${service._id}`,
        error: true,
        errorType: 'Customer services',
        errorMessage: 'Error reading service details from local DB'
      })
    } else {
      self.postMessage({ status: 300, route, action, key: `service: ${service._id}`, result: service })
      Object.assign(result.services[index], { serviceName: service.serviceName })
    }
  })

  Object.assign(result, { services })

  // self.postMessage({ status: 300, route, action, key: 'services', result })

  return { status, route: 'customers', action: 'get', key: id, result }
}
