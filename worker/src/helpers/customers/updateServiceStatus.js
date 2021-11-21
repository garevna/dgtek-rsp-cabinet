const { invalidServiceDeliveryStatusRequest } = require('../error-handlers').default

const [route, action] = ['customers', 'status']

const notFound = {
  status: 404,
  route,
  action,
  error: true,
  errorType: 'Customer service delivery status update'
}

const customerNotFound = Object.assign(notFound, { errorMessage: 'Customer was not found in local DB. Try to perform hard refresh please' })
const serviceNotFound = Object.assign(notFound, { errorMessage: 'This service was not assigned to the customer' })

export const updateServiceStatus = async function (customerId, serviceId, newStatus, lots = []) {
  if (!customerId || !serviceId || !newStatus) return invalidServiceDeliveryStatusRequest(customerId, serviceId)

  const customerData = await self.controller.getCustomer(customerId)

  if (customerData.status !== 200) return customerNotFound

  const { services } = customerData.result

  if (!services || !Array.isArray(services) || !services.length) return serviceNotFound

  const index = services.findIndex(service => service.id === serviceId)

  if (index === -1) return serviceNotFound

  const log = Object.assign(services[index].log ? services[index].log : {}, { [Date.now()]: newStatus })

  Object.assign(services[index], {
    modified: Date.now(),
    status: newStatus,
    lots,
    log
  })

  const response = self.controller.updateCustomerServices(customerId, services)

  if (response.status !== 200) return Object.assign(response, { action })

  return {
    status,
    route,
    action,
    result: response.result.services,
    message: true,
    messageType: 'Customer service delivery status update',
    messageText: 'Your request has been transmitted.'
  }
}
