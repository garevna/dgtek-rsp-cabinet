import { post } from '../AJAX'

import { idHandler } from '../env'

import { schedulingServiceRequestError } from '../error-handlers'

import { updateServiceStatus } from './'

export const schedulingRequest = async function (data) {
  const [route, action] = ['customers', 'scheduling']

  const { customerId, serviceId, lots } = data.serviceId ? data : data.data

  if (!customerId || !serviceId) return { status: 422, route, action, result: `Invalid request: customer ${customerId}, service ${serviceId}` }

  const reqData = Object.assign({}, { customerId, serviceId, lots }, {
    resellerId: idHandler(),
    status: 'Awaiting for confirmation',
    request: 'scheduling',
    modified: Date.now()
  })

  const { status, result } = await post(`scheduling/${customerId}`, reqData)

  if (status !== 200) return schedulingServiceRequestError(status, result)

  const { result: services } = await updateServiceStatus(customerId, serviceId, 'Awaiting for confirmation')

  return {
    status,
    route,
    action,
    result: services,
    message: true,
    messageType: 'Customer service delivery status update',
    messageText: 'Your scheduling request has been sent.'
  }
}
