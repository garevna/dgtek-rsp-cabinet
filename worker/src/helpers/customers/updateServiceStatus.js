const { invalidServiceDeliveryStatusRequest } = require('../error-handlers').default

const [route, action] = ['customers', 'status']

const notFound = {
  status: 404,
  route,
  action,
  error: true,
  errorType: 'Customer service delivery status update'
}

const specific = ['Awaiting to be suspended', 'Awaiting to be resumed', 'Awaiting for cancelation']
const final = ['Suspended', 'Resumed', 'Canceled']

const customerNotFound = Object.assign(notFound, { errorMessage: 'Customer was not found in local DB. Try to perform hard refresh please' })
const serviceNotFound = Object.assign(notFound, { errorMessage: 'This service was not assigned to the customer' })

export const updateServiceStatus = async function (customerId, serviceId, newStatus, lots) {
  if (!customerId || !serviceId || !newStatus) return invalidServiceDeliveryStatusRequest(customerId, serviceId)

  const special = specific.find(item => newStatus === item) || final.find(item => newStatus === item)

  const [suspendDate, resumeDate, cancelDate] = specific.map(status => newStatus === status ? lots[0] : null)

  self.postDebugMessage({ suspendDate, resumeDate, cancelDate })

  const customerData = await self.controller.getCustomer(customerId)

  if (customerData.status !== 200) return customerNotFound

  const { services } = customerData.result

  if (!services || !Array.isArray(services) || !services.length) return serviceNotFound

  const index = services.findIndex(service => service.id === serviceId)

  if (index === -1) return serviceNotFound

  Object.assign(services[index], {
    modified: Date.now(),
    status: newStatus,
    lots: special ? services[index].lots : lots || [],
    suspendDate,
    resumeDate,
    cancelDate,
    suspendedDate: services[index].suspendedDate || null,
    resumedDate: services[index].resumedDate || null,
    canceledDate: services[index].canceledDate || null,
    log: Object.assign(services[index].log ? services[index].log : {}, { [Date.now()]: newStatus })
  })

  const response = await self.controller.updateCustomerServices(customerId, services)

  self.postDebugMessage({ updateCustomerServicesResponse: response })

  if (response.status !== 200) return Object.assign(response, { action })

  return {
    status: 200,
    route,
    action,
    result: response.result.services,
    message: true,
    messageType: 'Customer service delivery status update',
    messageText: 'Your request has been transmitted.'
  }
}
