const { invalidServiceDeliveryStatusRequest } = require('../error-handlers').default

export const updateServiceStatus = async function (customerId, serviceId, newStatus, lots = []) {
  const [route, action] = ['customers', 'status']

  if (!customerId || !serviceId || !newStatus) return invalidServiceDeliveryStatusRequest(customerId, serviceId)

  const res = await self.controller.getCustomer(customerId)

  if (res.status !== 200) return res

  const { result: customerData } = res

  const { services } = customerData

  const index = services.findIndex(service => service.id === serviceId)

  if (index === -1) {
    return {
      status: 404,
      error: true,
      errorType: 'Service activation',
      errorMessage: 'Service was not found'
    }
  }

  services.splice(index, 1, Object.assign(services[index], {
    modified: Date.now(),
    status: newStatus,
    lots,
    log: Object.assign(services[index].log, { [Date.now()]: newStatus })
  }))

  const response = await self.controller.updateCustomer(customerId, Object.assign(customerData, { services }))

  if (response.status !== 200) return response

  return {
    status: response.status,
    route,
    action,
    result: services,
    message: true,
    messageType: 'Customer service delivery status update',
    messageText: 'Your scheduling request has been sent.'
  }
}
