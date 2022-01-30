import { get } from '../AJAX'
import { putRecordByKey } from '../db'

import {
  partnerUniqueCodeHandler
  // customersRefreshErrorsHandler
} from '../../data-handlers'

import { statisticsController } from '../../controllers'

const updateCode = code => `${partnerUniqueCodeHandler()}${code.slice(2)}`
// const { refreshCustomersListError } = require('../error-handlers').default

const [route, action] = ['updates', 'customers']

export const getCustomerUpdates = async function (notifications) {
  if (!notifications || !Array.isArray(notifications)) return { status: 204, route, action, result: [] }

  let promises = notifications
    .filter(item => item.target === 'customer')
    .map(note => note.id)
    .map(id => get(`customer/${id}`))

  const responses = await Promise.all(promises)

  const customers = responses.map(response => response.result)

  promises = customers
    .map((customer) => {
      if (!customer.services) Object.assign(customer, { services: [] })
      customer.services.forEach(service => statisticsController.patch(service.id, customer._id, service.status, service.modified))

      return putRecordByKey('customers', customer._id, Object.assign(customer, { uniqueCode: updateCode(customer.uniqueCode) }))
    })

  await Promise.all(promises)

  return { status: 200, route, action, result: customers }
}
