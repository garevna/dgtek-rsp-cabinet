import { statisticsController } from '../../controllers'

const { invalidServiceDeliveryStatusRequest } = require('../error-handlers').default

const [route, action, serviceStatus] = ['customers', 'resume', 'Awaiting to be resumed']

export const resumeService = async function (customerId, serviceId, date) {
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
    messageText: 'Request to resume service has been sent.'
  }
}
