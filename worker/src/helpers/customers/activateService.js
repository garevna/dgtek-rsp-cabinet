import { statisticsController } from '../../controllers'

const { invalidServiceDeliveryStatusRequest } = require('../error-handlers').default

const [route, action] = ['customers', 'activate']

export const activateService = async function (customerId, serviceId) {
  if (!customerId || !serviceId) return invalidServiceDeliveryStatusRequest(customerId, serviceId)

  const { status, result } = await self.controller.updateServiceStatus(customerId, serviceId, 'Awaiting for connection')

  statisticsController.patch(serviceId, customerId, 'Awaiting for connection', Date.now())

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
