import { post } from '../AJAX'

import { idHandler } from '../env'

import { getWeekNumber } from 'garevna-date-functions'

const {
  invalidServiceDeliveryStatusRequest,
  activateServiceRequestError
} = require('../error-handlers').default

// import { updateServiceStatus } from './'

export const activateServiceRequest = async function (customerId, serviceId) {
  const [route, action] = ['customers', 'activate']

  if (!customerId || !serviceId) return invalidServiceDeliveryStatusRequest(customerId, serviceId)

  const { status, result } = await post('scheduling', {
    customerId,
    serviceId,
    resellerId: idHandler(),
    status: 'Awaiting for connection',
    modified: Date.now(),
    weekNumber: getWeekNumber(new Date())
  })

  if (status !== 200) return activateServiceRequestError(status, result)

  const { result: services } = await self.controller.updateServiceStatus(customerId, serviceId, 'Awaiting for connection')

  return {
    status,
    route,
    action,
    result: services,
    message: true,
    messageType: 'Customer service delivery status update',
    messageText: 'Your service activation request has been sent.'
  }
}
