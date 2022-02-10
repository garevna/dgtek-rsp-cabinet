import { statisticsController } from '../../controllers'

const { invalidServiceDeliveryStatusRequest } = require('../error-handlers').default

const [route, action, serviceStatus] = ['customers', 'suspend', 'Awaiting to be suspended']

export const suspendService = async function (customerId, serviceId, date) {
  if (!customerId || !serviceId) return invalidServiceDeliveryStatusRequest(customerId, serviceId)

  const { status, result } = await self.controller.updateServiceStatus(customerId, serviceId, serviceStatus, [date])

  statisticsController.patch(serviceId, customerId, serviceStatus, Date.parse(date))

  return {
    status,
    route,
    action,
    result,
    message: true,
    messageType: 'Customer service delivery status update',
    messageText: 'Request to suspend service has been sent.'
  }
}
