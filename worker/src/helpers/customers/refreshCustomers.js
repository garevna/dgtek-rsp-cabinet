import { get, patch } from '../AJAX'
import { clearStore, /* getRecordByKey, */ putRecordByKey } from '../db'

import { servicesInfoHandler, partnerUniqueCodeHandler } from '../../data-handlers'

const updateCode = code => `${partnerUniqueCodeHandler()}${code.slice(2)}`

const { refreshCustomersListError } = require('../error-handlers').default

const [route, action] = ['customers', 'refresh']

export const refreshCustomers = async function () {
  let currentPage = 1
  let done = false
  servicesInfoHandler('reset')
  clearStore('customers')

  const { status, result: services } = await self.controller.getListOfServices()

  if (status !== 200) return refreshCustomersListError(status)

  services.forEach(service => servicesInfoHandler('set-service-data', service._id, { serviceName: service.serviceName, subscriptionFee: service.subscriptionFee }))

  const errors = []
  const info = []

  while (!done) {
    const { status, result, pages } = await get(`customer?page=${currentPage}`)

    if (status !== 200) return refreshCustomersListError(status)

    done = currentPage++ >= pages

    for (const customer of result) {
      if (!customer.services || !customer.services.length) continue
      for (const service of customer.services) {
        const serviceDetails = services.find(item => item._id === service.id)
        !serviceDetails ? errors.push({ customerId: customer._id, serviceId: service.id })
          : info.push({
            id: service.id,
            status: service.status,
            modified: service.modified
          })
      }
    }

    for (const error of errors) {
      const { customerId, serviceId } = error
      const customer = result.find(item => item._id === customerId)
      const index = customer.services.findIndex(service => service.id === serviceId)
      customer.services.splice(index, 1)
      self.postDebugMessage({ patch: await patch(`customer/${customer._id}`, { services: customer.services }) })
    }

    const promises = result.map(customer => putRecordByKey('customers', customer._id, Object.assign(customer, { uniqueCode: updateCode(customer.uniqueCode) })))
    await Promise.all(promises)

    info.forEach(record => servicesInfoHandler('add-service', record.id, { status: record.status, modified: record.modified }))
  }

  if (errors.length) {
    const verb = errors.length > 1 ? 'are' : 'is'
    const char = errors.length > 1 ? 's' : ''

    self.postMessage({
      route,
      action,
      error: true,
      errorType: 'Customer services',
      errorMessage: `${errors.length} service${char} ${verb} not available. Most likely, you had assigned a service to the customer earlier but this service is unavailable to you now. Contact admin please.`,
      errors
    })
  }

  self.postMessage({ status: 200, route: 'dashboard', action: 'info', result: servicesInfoHandler() })
  return { status: 200, route, action, result: (await self.controller.getAllCustomers()).result }
}
