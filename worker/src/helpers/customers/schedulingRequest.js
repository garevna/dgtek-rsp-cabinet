import { statisticsController } from '../../controllers'

const [route, action] = ['customers', 'scheduling']

const error = {
  route,
  action,
  error: true,
  errorType: 'Scheduling',
  errorMessage: 'Scheduling request failed'
}

export const schedulingRequest = async function (data) {
  const { customerId, serviceId, lots } = data

  if (!customerId || !serviceId) return { status: 422, route, action, result: `Invalid request: customer ${customerId}, service ${serviceId}` }

  const { status, result } = await self.controller.updateServiceStatus(customerId, serviceId, 'Awaiting for confirmation', lots)

  if (status !== 200) return Object.assign({}, error, { status })

  statisticsController.patch(serviceId, customerId, 'Awaiting for confirmation', Date.now())

  return { status, route, action, result }
}
