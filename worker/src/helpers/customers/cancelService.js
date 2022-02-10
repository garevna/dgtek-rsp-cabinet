import { statisticsController } from '../../controllers'

const { invalidServiceDeliveryStatusRequest } = require('../error-handlers').default

const [route, action, serviceStatus] = ['customers', 'cancel', 'Awaiting for cancelation']

export const cancelService = async function (customerId, serviceId, date) {
  if (!customerId || !serviceId) return invalidServiceDeliveryStatusRequest(customerId, serviceId)

  const { status, result } = await self.controller.updateServiceStatus(customerId, serviceId, serviceStatus, [date])

  statisticsController.patch(serviceId, customerId, serviceStatus, Date.parse(date))

  self.postDebugMessage({ statistics: statisticsController.getStatistics() })

  return {
    status,
    route,
    action,
    result,
    message: true,
    messageType: 'Customer service delivery status update',
    messageText: 'Request for service cancelation has been sent.'
  }
}
