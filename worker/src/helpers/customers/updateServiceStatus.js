import { getCustomer, updateCustomer } from './'
import { invalidServiceDeliveryStatusRequest } from '../error-handlers'

export const updateServiceStatus = async function (customerId, serviceId, newStatus) {
  const [route, action] = ['customers', 'status']

  if (!customerId || !serviceId) return invalidServiceDeliveryStatusRequest(customerId, serviceId)

  const res = await getCustomer(customerId)

  if (res.status !== 200) return res

  const { result: customerData } = res

  const { services } = customerData

  const index = services.findIndex(service => service.id === serviceId)

  if (index === -1) {
    return {
      status: 500,
      error: true,
      errorType: 'Service activation',
      errorMessage: 'Service was not found'
    }
  }

  services.splice(index, 1, Object.assign(services[index], {
    modified: Date.now(),
    status: newStatus,
    log: Object.assign(services[index].log, { [Date.now()]: newStatus })
  }))

  const response = await updateCustomer(customerId, Object.assign(customerData, { services }))

  if (response.status !== 200) return response

  return {
    status: response.status,
    route,
    action,
    result: services
  }
}
