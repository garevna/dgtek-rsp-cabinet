import { get } from '../AJAX'
import { clearStore, putRecordByKey } from '../db'

import {
  // servicesInfoHandler,
  partnerUniqueCodeHandler,
  customersRefreshErrorsHandler
} from '../../data-handlers'

import { statisticsController } from '../../controllers'

const updateCode = code => `${partnerUniqueCodeHandler()}${code.slice(2)}`

const { refreshCustomersListError } = require('../error-handlers').default

const [route, action] = ['customers', 'refresh']

export const refreshCustomers = async function () {
  let currentPage = 1
  let done = false
  // servicesInfoHandler('reset')
  clearStore('customers')

  const { status, result: services } = await self.controller.getListOfServices()

  if (status !== 200) return refreshCustomersListError(status)

  for (const service of services) {
    statisticsController.put(service._id, service.serviceName, service.subscriptionFee)
  }

  // let errorMessages = 'Errors:'

  while (!done) {
    const { status, result, pages } = await get(`customer?page=${currentPage}&per_page=100`)

    if (status !== 200) return refreshCustomersListError(status)

    done = currentPage++ >= pages

    customersRefreshErrorsHandler('update', result, services)

    // for (const error of customersRefreshErrorsHandler('errors')) {
    //   errorMessages += `\n${error.customerAddress}: service ${error.serviceName}`
    // }

    const promises = result.map(customer => putRecordByKey('customers', customer._id, Object.assign(customer, { uniqueCode: updateCode(customer.uniqueCode) })))
    await Promise.all(promises)

    for (const customer of result) {
      if (!customer.services) customer.services = []
      for (const service of customer.services) {
        statisticsController.patch(service.id, customer._id, service.status, service.modified)
      }
    }
  }

  statisticsController.getStatistics()

  return { status: 200, route, action/*, result: (await self.controller.getAllCustomers()).result */ }
}
