import { statisticsController } from '../../controllers'

const { invalidServiceDeliveryStatusRequest } = require('../error-handlers').default

const [route, action, serviceStatus] = ['customers', 'finish-suspend', 'Suspended']

export const finishServiceSuspension = async function (customerId, serviceId, date) {
  if (!customerId || !serviceId) return invalidServiceDeliveryStatusRequest(customerId, serviceId)

  const { status, result } = await self.controller.updateServiceStatus(customerId, serviceId, serviceStatus)

  statisticsController.patch(serviceId, customerId, serviceStatus, date)

  return {
    status,
    route,
    action,
    result,
    message: true,
    messageType: 'Customer service delivery status update',
    messageText: 'Service suspended.'
  }
}
