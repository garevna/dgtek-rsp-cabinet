import { post } from '../AJAX'

import { idHandler } from '../env'

import { activateServiceRequestError } from '../error-handlers'

import { updateServiceStatus } from './'

import {
  getWeekNumber,
  getWeekStartDate,
  getWeekEndDate
} from '../'

// import { getServiceById, putService } from '../services'

export const activateServiceRequest = async function (data) {
  const [route, action] = ['customers', 'activate']

  const { customerId, serviceId } = data.serviceId ? data : data.data

  if (!customerId || !serviceId) return { status: 422, route, action, result: `Invalid request: customer ${customerId}, service ${serviceId}` }

  const date = new Date()

  const reqData = Object.assign({}, { customerId, serviceId }, {
    resellerId: idHandler(),
    status: 'Awaiting for connection',
    request: 'booking',
    weekNumber: getWeekNumber(date),
    weekDetails: {
      start: getWeekStartDate(date),
      end: getWeekEndDate(date)
    },
    modified: Date.now()
  })

  const { status, result } = await post(`scheduling/${customerId}`, reqData)

  if (status !== 200) return activateServiceRequestError(status, result)

  const { result: services } = await updateServiceStatus(customerId, serviceId, 'Awaiting for connection')

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
