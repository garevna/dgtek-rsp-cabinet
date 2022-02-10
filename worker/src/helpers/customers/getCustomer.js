import { getRecordByKey } from '../db'

const { getCustomerDataError } = require('../error-handlers').default

const [route, action] = ['customers', 'get']

const serviceError = {
  status: 404,
  route,
  action,
  error: true,
  errorType: 'Customer services'
}

export const getCustomer = async function (id) {
  const { status, result: customer } = await getRecordByKey('customers', id)

  if (status !== 200) return getCustomerDataError(status)

  const { services = [] } = customer

  let index = 0

  const tested = []

  for (const service of services) {
    if (!service.id) {
      self.postMessage(Object.assign({}, serviceError, { errorMessage: 'Service id is not defined' }))
      continue
    }

    if (service.status === 'Awaiting for cancelation') {
      self.postDebugMessage({ serviceStatus: service.status, cancelDate: service.cancelDate, canceledDate: service.canceledDate, currentDate: new Date().toISOString().slice(0, 10) })
      if (service.canceledDate <= new Date().toISOString().slice(0, 10)) {
        self.postDebugMessage({ message: 'Canceled' })
        // await self.controller.updateServiceStatus(id, service.id, 'Canceled')
      }
    }

    if (service.status === 'Awaiting to be suspended') {
      self.postDebugMessage({ serviceStatus: service.status, suspendDate: service.suspendDate, suspendedDate: service.suspendedDate })
      if (service.canceledDate <= new Date().toISOString().slice(0, 10)) {
        self.postDebugMessage({ message: 'Suspended' })
        // await self.controller.updateServiceStatus(id, service.id, 'Canceled')
      }
    }

    const { status, result } = await getRecordByKey('services', service.id)

    if (status !== 200) {
      self.postMessage(Object.assign({}, serviceError, { errorMessage: `Service ${service.id} is not available` }))
      tested.push(Object.assign(customer.services[index], { serviceName: 'Unknown' }))
    } else tested.push(Object.assign(customer.services[index], { serviceName: result.serviceName }))
    index++
  }

  self.postDebugMessage({ customer: id, services: tested })

  Object.assign(customer, { services: JSON.parse(JSON.stringify(tested)) })

  return { status, route, action, key: id, result: customer }
}
