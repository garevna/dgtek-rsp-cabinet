import { getCustomer, updateCustomer } from './'

export const updateServiceStatus = async function (customerId, serviceId, newStatus) {
  const [route, action] = ['customers', 'status']

  if (!customerId || !serviceId) return { status: 422, route, action, result: `Invalid request: customer ${customerId}, service ${serviceId}` }

  const getResponse = await getCustomer(customerId)

  if (getResponse.status !== 200) return getResponse

  const { result: customerData } = getResponse

  const { services } = customerData

  const index = services.findIndex(service => service.id === serviceId)

  services.splice(index, 1, Object.assign(services[index], {
    modified: Date.now(),
    status: newStatus,
    log: Object.assign(services[index].log, { [Date.now()]: newStatus })
  }))

  const response = await updateCustomer(customerId, Object.assign(customerData, { services }))

  if (response.status !== 200) return response

  return {
    status: response.status,
    route,
    action,
    result: services
  }
}
