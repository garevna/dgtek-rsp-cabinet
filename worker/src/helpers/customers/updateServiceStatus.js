import {
  getCustomerDataError,
  putCustomerDataError
} from '../error-handlers'

import { getCustomer, updateCustomer } from './'

export const updateServiceStatus = async function (customerId, serviceId, newStatus) {
  const [route, action] = ['customers', 'status']

  self.postMessage({ status: 300, route, action, customerId, serviceId, newStatus })

  if (!customerId || !serviceId) return { status: 422, route, action, result: `Invalid request: customer ${customerId}, service ${serviceId}` }

  const { status: getStatus, result: customerData } = await getCustomer(customerId)

  self.postMessage({ status: 300, route, action, result: { getStatus, customerData } })

  if (getStatus !== 200) return getCustomerDataError(getStatus)

  const { services } = customerData

  const index = services.findIndex(service => service.id === serviceId)

  services.splice(index, 1, Object.assign(services[index], {
    modified: Date.now(),
    status: newStatus,
    log: Object.assign(services[index].log, { [Date.now()]: newStatus })
  }))

  self.postMessage({ status: 300, route, action, services })

  const { status: updateStatus, result: updateResult } = await updateCustomer(customerId, Object.assign(customerData, { services }))

  self.postMessage({ status: 300, route, action: 'update service status', response: { updateStatus, updateResult } })

  if (updateStatus !== 200) putCustomerDataError(updateStatus)

  return {
    status: updateStatus,
    route,
    action,
    result: customerData.services
  }
}
