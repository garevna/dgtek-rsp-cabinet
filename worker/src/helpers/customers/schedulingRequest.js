// import { post } from '../AJAX'

// import { idHandler } from '../env'

// const { schedulingServiceRequestError } = require('../error-handlers').default

export const schedulingRequest = async function (data) {
  const [route, action] = ['customers', 'scheduling']

  const { customerId, serviceId, lots } = data

  if (!customerId || !serviceId) return { status: 422, route, action, result: `Invalid request: customer ${customerId}, service ${serviceId}` }

  /* rudimentary */

  // const reqData = Object.assign({}, { customerId, serviceId, lots }, {
  //   resellerId: idHandler(),
  //   status: 'Awaiting for confirmation',
  //   request: 'scheduling',
  //   modified: Date.now(),
  //   weekNumber: self.getWeekNumber(new Date())
  // })

  // const { status, result } = await post('scheduling', reqData)

  /* actual (must be) */

  // const { status, result } = await post('scheduling', { customerId, serviceId })

  // if (status !== 200) return schedulingServiceRequestError(status, result)

  return await self.controller.updateServiceStatus(customerId, serviceId, 'Awaiting for confirmation', lots)
}
