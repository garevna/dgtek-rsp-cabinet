const { invalidServiceDeliveryStatusRequest } = require('../error-handlers').default

export const activateServiceRequest = async function (customerId, serviceId) {
  const [route, action] = ['customers', 'activate']

  if (!customerId || !serviceId) return invalidServiceDeliveryStatusRequest(customerId, serviceId)

  const { status, result } = await self.controller.updateServiceStatus(customerId, serviceId, 'Awaiting for connection')

  return {
    status,
    route,
    action,
    result,
    message: true,
    messageType: 'Customer service delivery',
    messageText: 'Service activation request has been sent.'
  }
}
