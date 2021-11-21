let errors = []
let info = []

export const customersRefreshErrorsHandler = function (action, customers, services) {
  if (action === 'reset') {
    errors = []
    info = []
    return
  }

  if (action === 'errors') return errors
  if (action === 'info') return info

  if (!customers || !services) return { errors, info }

  for (const customer of customers) {
    customer.services = customer.services || []
    if (!customer.services.length) continue
    const customerAddress = `${customer.apartmentNumber || ''}${customer.apartmentNumber ? '/' : ''}${customer.address}`
    for (const service of customer.services) {
      const serviceDetails = services.find(item => item._id === service.id)
      !serviceDetails ? errors.push({ customerId: customer._id, customerAddress, serviceId: service.id, serviceName: serviceDetails?.serviceName })
        : info.push({
          customerId: customer._id,
          id: service.id,
          status: service.status,
          modified: service.modified
        })
    }
  }
  self.postDebugMessage({ info })
  self.postDebugMessage({ errors })
}
