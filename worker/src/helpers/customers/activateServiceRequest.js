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

  self.postMessage({ status: 300, route, action, data })

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
    }
  })

  self.postMessage({ status: 300, route, action, reqData })

  const { status, result } = await post(`scheduling/${customerId}`, reqData)

  self.postMessage({ status: 300, route, action, response: { status, result } })

  if (status !== 200) return activateServiceRequestError(status, result)

  const { result: services } = await updateServiceStatus(customerId, serviceId, 'Avaiting for confirmation')

  return {
    status,
    route,
    action,
    result: services,
    message: true,
    messageType: 'Service activation',
    messageText: 'You service delivery update request has been sent.'
  }
}
