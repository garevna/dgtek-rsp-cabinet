import { statisticsController } from '../../controllers'

const { invalidServiceDeliveryStatusRequest } = require('../error-handlers').default

const [route, action] = ['customers', 'assign']

const error = {
  route,
  action,
  error: true,
  errorType: 'Assignment a new service to customer'
}

const notFound = Object.assign(error, {
  status: 404,
  errorMessage: 'Customer was not found in local DB. Try to perform hard refresh please'
})

const conflict = Object.assign(error, {
  status: 409,
  errorMessage: 'This service has been allready assigned to the customer'
})

export const assignNewServiceToCustomer = async function (customerId, serviceId) {
  if (!customerId || !serviceId) return invalidServiceDeliveryStatusRequest(customerId, serviceId)

  const customerData = await self.controller.getCustomer(customerId)

  if (customerData.status !== 200) return notFound

  const { services = [] } = customerData.result

  if (services.find(service => service.id === serviceId)) return conflict

  statisticsController.patch(serviceId, customerId, 'Not connected', Date.now())

  statisticsController.getStatistics()

  services.push({
    modified: Date.now(),
    id: serviceId,
    status: 'Not connected',
    lots: [],
    installation: {},
    log: { [Date.now()]: 'Not connected' }
  })

  const response = await self.controller.updateCustomerServices(customerId, services)

  if (response.status !== 200) return Object.assign(response, { action })

  return {
    status: 200,
    route,
    action,
    result: services,
    message: true,
    messageType: 'Customer service delivery status update',
    messageText: 'Your request has been transmitted.'
  }
}
