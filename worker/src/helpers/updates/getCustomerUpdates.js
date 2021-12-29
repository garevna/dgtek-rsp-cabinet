import { get } from '../AJAX'
import { putRecordByKey } from '../db'

import {
  partnerUniqueCodeHandler
  // customersRefreshErrorsHandler
} from '../../data-handlers'

import { statisticsController } from '../../controllers'

const updateCode = code => `${partnerUniqueCodeHandler()}${code.slice(2)}`
const { refreshCustomersListError } = require('../error-handlers').default

const [route, action] = ['updates', 'customers']

export const getCustomerUpdates = async function () {
  let currentPage = 1
  let updatedCustomersNumber = 0

  // self.postDebugMessage({ statisticsBefore: JSON.parse(JSON.stringify(statisticsController)) })

  do {
    const { status, result, pages } = await get(`customer?changed=true&page=${currentPage++}&per_page=100`)
    if (status !== 200) return refreshCustomersListError(status)

    if (!result.length) break

    updatedCustomersNumber += result.length

    const promises = result.map(customer => putRecordByKey('customers', customer._id, Object.assign(customer, { uniqueCode: updateCode(customer.uniqueCode) })))
    await Promise.all(promises)

    for (const customer of result) {
      if (!customer.services) customer.services = []
      for (const service of customer.services) {
        statisticsController.patch(service.id, customer._id, service.status, service.modified)
      }
    }

    // self.postDebugMessage({ statisticsAfter: JSON.parse(JSON.stringify(statisticsController)) })

    var done = currentPage > pages
  } while (!done)

  return { status: 200, route, action, result: updatedCustomersNumber }
}
